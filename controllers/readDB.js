import {
  getAllGamesInfo,
  getDevList,
  getGenreList,
  getGamesInfoByDevID,
  getGamesInfoByGenreID,
} from "../db/queriesGet.js";

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
    script: "index.js",
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

export async function gamePageGet(req, res) {
  const devArr = await getDevList();
  const genreArr = await getGenreList();
  res.render("gamePage", {
    devArr,
    genreArr,
    script: "addGame.js",
  });
}
