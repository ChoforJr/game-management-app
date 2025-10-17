import { body, validationResult, matchedData } from "express-validator";
import {
  getAllGamesInfo,
  getDevList,
  getGenreList,
  getGamesInfoByDevID,
  getGamesInfoByGenreID,
} from "../db/queriesGet.js";
const devArr = await getDevList();
const genreArr = await getGenreList();

const devIds = devArr.map((dev) => dev.id.toString());
const genreIds = genreArr.map((genre) => genre.id.toString());

const validateUser = [
  body("game")
    .trim()
    .matches(/^[A-Za-z0-9\s]+$/) // Allows letters, numbers, and spaces
    .withMessage("Game name must contain only letters, numbers, and spaces.")
    .isLength({ min: 2, max: 64 })
    .withMessage("Game Name Has to have a length of between 2 and 64")
    .custom(async (value) => {
      const gameArr = await getAllGamesInfo();

      gameArr.forEach((element) => {
        if (element.game.toLowerCase() === value.toLowerCase()) {
          throw new Error("Game Has already been Added");
        }
      });
      return true;
    }),
  body("year")
    .trim()
    .isInt({ min: 1980, max: 2100 })
    .withMessage("Release year must be between 1980 to 2100"),
  body("sales")
    .trim()
    .notEmpty()
    .withMessage("input Sales")
    .isNumeric()
    .withMessage("Sales can only be in numbers"),
  body("mainDev")
    .trim()
    .isIn(devIds)
    .withMessage("Main Developer not Available"),
  body("mainGenres")
    .trim()
    .isIn(genreIds)
    .withMessage("Main Genre not Available"),
  body("otherDev")
    .optional()
    .isArray()
    .withMessage("Other Developers must be an array (internal error)")
    .custom((value) => {
      const invalidDevs = value.filter((id) => !devIds.includes(id.toString()));
      if (invalidDevs.length > 0) {
        throw new Error("One or more selected developers are invalid.");
      }
      return true;
    }),
  body("otherGenre")
    .optional()
    .isArray()
    .withMessage("Other Genres must be an array (internal error)")
    .custom((value) => {
      const invalidGenres = value.filter(
        (id) => !genreIds.includes(id.toString())
      );
      if (invalidGenres.length > 0) {
        throw new Error("One or more selected genres are invalid.");
      }
      return true;
    }),
];

// // We can pass an entire array of middleware validations to our controller.
// export const addNewMessage = [
//   validateUser,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).render("form", {
//         errors: errors.array(),
//         links: links,
//         user: req.body.user || "",
//         message: req.body.message || "",
//       });
//     }
//     const { user, message } = matchedData(req);
//     await insertMessage(user, message);
//     res.redirect("/");
//   },
// ];

// export async function getMessageByID(req, res) {
//   const message = await searchMessageByID(req.params.id);
//   res.render("details", {
//     message: message[0],
//   });
// }

// export function createNewMessage(req, res) {
//   res.render("form", {
//     links: links,
//     user: "user",
//     message: "message",
//   });
// }
