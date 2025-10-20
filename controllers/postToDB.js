import { body, validationResult, matchedData } from "express-validator";
import { getAllGamesInfo, getDevList, getGenreList } from "../db/queriesGet.js";
import { insertGame } from "../db/queriesPost.js";

const devArr = await getDevList();
const genreArr = await getGenreList();

const devIds = devArr.map((dev) => dev.id.toString());
const genreIds = genreArr.map((genre) => genre.id.toString());

const validateGame = [
  body("game")
    .trim()
    .matches(/^[A-Za-z0-9\s]+$/) // Allows letters, numbers, and spaces
    .withMessage("Name: must contain only letters, numbers, and spaces.")
    .isLength({ min: 2, max: 64 })
    .withMessage("Name: Has to have a length of between 2 and 64")
    .custom(async (value) => {
      const gameArr = await getAllGamesInfo();

      gameArr.forEach((element) => {
        if (element.game.toLowerCase() === value.toLowerCase()) {
          throw new Error("Name: Has already been Added");
        }
      });
      return true;
    }),
  body("year")
    .trim()
    .isInt({ min: 1980, max: 2100 })
    .withMessage("Release year: must be between 1980 to 2100"),
  body("sales")
    .trim()
    .notEmpty()
    .withMessage("Sales: amount required")
    .isNumeric()
    .withMessage("Sales: can only be in numbers"),
  body("mainDev")
    .trim()
    .isIn(devIds)
    .withMessage("Main Developer: not Available"),
  body("mainGenres")
    .trim()
    .isIn(genreIds)
    .withMessage("Main Genre: not Available"),
  body("otherDev")
    .optional()
    .isArray()
    .withMessage("Other Developers: must be an array (internal error)")
    .custom((value) => {
      const invalidDevs = value.filter((id) => !devIds.includes(id.toString()));
      if (invalidDevs.length > 0) {
        throw new Error(
          "Other Developers: One or more selected developers are invalid."
        );
      }
      return true;
    }),
  body("otherGenre")
    .optional()
    .isArray()
    .withMessage("Other Genres: must be an array (internal error)")
    .custom((value) => {
      const invalidGenres = value.filter(
        (id) => !genreIds.includes(id.toString())
      );
      if (invalidGenres.length > 0) {
        throw new Error(
          "Other Genres: One or more selected genres are invalid."
        );
      }
      return true;
    }),
];

export const addNewGame = [
  validateGame,
  async (req, res) => {
    const errors = validationResult(req);
    let devOthers, genreOthers;
    if (!req.body.otherDev) {
      devOthers = [];
    } else {
      devOthers = req.body.otherDev.map(Number);
    }
    if (!req.body.otherGenre) {
      genreOthers = [];
    } else {
      genreOthers = req.body.otherGenre.map(Number);
    }
    if (!errors.isEmpty()) {
      return res.status(400).render("gamePage", {
        errors: errors.array(),
        game: req.body.game,
        year: req.body.year,
        sales: req.body.sales,
        mainDev: req.body.mainDev,
        mainGenres: req.body.mainGenres,
        otherDev: devOthers,
        otherGenre: genreOthers,
        script: "addGame.js",
        devArr,
        genreArr,
      });
    }
    const { game, year, sales, mainDev, mainGenres, otherDev, otherGenre } =
      matchedData(req);

    const otherDevMainDev = otherDev || [];
    const otherGenreMainGenre = otherGenre || [];

    otherDevMainDev.push(mainDev);
    otherGenreMainGenre.push(mainGenres);

    await insertGame(
      game,
      year,
      mainDev,
      mainGenres,
      sales,
      otherDevMainDev,
      otherGenreMainGenre
    );
    res.redirect("/");
  },
];
