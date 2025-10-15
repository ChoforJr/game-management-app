import {
  getAllGamesInfo,
  getDevList,
  getGenreList,
  getGamesInfoByDevID,
  getGamesInfoByGenreID,
} from "../db/queriesGet.js";
// This just shows the new stuff we're adding to the existing
// import { body, validationResult, matchedData } from "express-validator";

// const validateUser = [
//   body("user")
//     .trim()
//     .matches(/^[A-Za-z0-9\s]+$/) // Allows letters, numbers, and spaces
//     .withMessage("Username must contain only letters, numbers, and spaces.")
//     .isLength({ min: 8, max: 30 })
//     .withMessage("User Name Has to have a length of between 8 and 30"),
//   body("message")
//     .trim()
//     .isLength({ min: 1, max: 200 })
//     .withMessage("Messages Cannot be less than 1 or more than 200 characters"),
// ];

export async function homePageGet(req, res) {
  const gameArr = await getAllGamesInfo();
  const devArr = await getDevList();
  const genreArr = await getGenreList();
  res.render("index", {
    gameArr,
    devArr,
    genreArr,
    devHeader: "Main Developer",
    genreHeader: "Main Genre",
  });
}

export async function devPageGet(req, res) {
  const gameArr = await getGamesInfoByDevID(req.params.id);
  res.render("devPage", {
    gameArr,
    devHeader: "Developer",
    genreHeader: "Main Genre",
    devName: gameArr[0].dev,
  });
}

export async function genrePageGet(req, res) {
  const gameArr = await getGamesInfoByGenreID(req.params.id);
  res.render("genrePage", {
    gameArr,
    devHeader: "Main Developer",
    genreHeader: "Genre",
    genreName: gameArr[0].genre,
  });
}

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
