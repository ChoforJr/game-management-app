import { body, validationResult, matchedData } from "express-validator";
import { getAllGamesInfo, getDevList, getGenreList } from "../db/queriesGet.js";
import { editGame, editDev } from "../db/queriesPut.js";

const devArr = await getDevList();
const genreArr = await getGenreList();
const gameArr = await getAllGamesInfo();

const devIds = devArr.map((dev) => dev.id.toString());
const genreIds = genreArr.map((genre) => genre.id.toString());
const gameIds = gameArr.map((game) => game.id.toString());

const validateGame = [
  body("game")
    .trim()
    .matches(/^[A-Za-z0-9\s]+$/) // Allows letters, numbers, and spaces
    .withMessage("Name: must contain only letters, numbers, and spaces.")
    .isLength({ min: 2, max: 64 })
    .withMessage("Name: Has to have a length of between 2 and 64"),
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

export const updateGame = [
  validateGame,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
        pageState: `Edit Game With ID: ${req.params.id}`,
        submitState: "Submit Changes",
        action: `edtGamePg/${req.params.id}`,
        gameID: req.params.id,
      });
    }
    const { game, year, sales, mainDev, mainGenres, otherDev, otherGenre } =
      matchedData(req);

    const otherDevMainDev = otherDev || [];
    const otherGenreMainGenre = otherGenre || [];

    otherDevMainDev.push(mainDev);
    otherGenreMainGenre.push(mainGenres);

    const gameID = req.params.id;

    await editGame(
      game,
      year,
      mainDev,
      mainGenres,
      sales,
      otherDevMainDev,
      otherGenreMainGenre,
      gameID
    );
    res.redirect("/");
  },
];

const validateDev = [
  body("newDev")
    .trim()
    .matches(/^[A-Za-z0-9\s]+$/)
    .withMessage(
      "Studio Name : must contain only letters, numbers, and spaces."
    )
    .isLength({ min: 3, max: 32 })
    .withMessage("Studio Name : Has to have a length of between 3 and 32"),
  body("yearFd")
    .trim()
    .isInt({ min: 1900, max: 2100 })
    .withMessage("Founded Year: must be between 1900 to 2100"),
  body("gamesMd")
    .optional()
    .isArray()
    .withMessage("Games Made : must be an array (internal error)")
    .custom((value) => {
      const invalidgames = value.filter(
        (id) => !gameIds.includes(id.toString())
      );
      if (invalidgames.length > 0) {
        throw new Error("Games Made: One or more selected games are invalid.");
      }
      return true;
    }),
];

export const updateDev = [
  validateDev,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let gamesSel;
      if (!req.body.gamesMd) {
        gamesSel = [];
      } else {
        gamesSel = req.body.gamesMd.map(Number);
      }
      return res.status(400).render("addDev", {
        errors: errors.array(),
        newDev: req.body.newDev,
        yearFd: req.body.yearFd,
        gamesMd: gamesSel,
        gameArr,
        pageState: `Edit Developer of ID: ${req.params.id}`,
        submitState: "Submit changes",
        action: `devPage/edtDevPg/${req.params.id}`,
      });
    }
    const { newDev, yearFd, gamesMd } = matchedData(req);

    const gamesMdOrNot = gamesMd || [];
    const devID = req.params.id;

    await editDev(newDev, yearFd, gamesMdOrNot, devID);

    res.redirect("/");
  },
];

// const validateGenre = [
//   body("newGenre")
//     .trim()
//     .matches(/^[A-Za-z0-9\s]+$/)
//     .withMessage("Genre Name : must contain only letters, numbers, and spaces.")
//     .isLength({ min: 3, max: 32 })
//     .withMessage("Genre Name : Has to have a length of between 3 and 32")
//     .custom(async (value) => {
//       genreArr.forEach((element) => {
//         if (element.genre.toLowerCase() === value.toLowerCase()) {
//           throw new Error("Studio Name : Has already been Added");
//         }
//       });
//       return true;
//     }),
//   body("gamesInc")
//     .optional()
//     .isArray()
//     .withMessage("Games Included : must be an array (internal error)")
//     .custom((value) => {
//       const invalidgames = value.filter(
//         (id) => !gameIds.includes(id.toString())
//       );
//       if (invalidgames.length > 0) {
//         throw new Error(
//           "Games Included : One or more selected games are invalid."
//         );
//       }
//       return true;
//     }),
// ];

// export const updateGenre = [
//   validateGenre,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       let gamesSel;
//       if (!req.body.gamesInc) {
//         gamesSel = [];
//       } else {
//         gamesSel = req.body.gamesInc.map(Number);
//       }
//       return res.status(400).render("addGenre", {
//         errors: errors.array(),
//         newGenre: req.body.newGenre,
//         gamesInc: gamesSel,
//         gameArr,
//       });
//     }
//     const { newGenre, gamesInc } = matchedData(req);

//     await insertGenre(newGenre, gamesInc);

//     res.redirect("/");
//   },
// ];
