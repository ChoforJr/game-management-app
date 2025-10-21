import {
  getAllGamesInfo,
  getDevList,
  getGenreList,
  getGamesInfoByDevID,
  getGamesInfoByGenreID,
  getDevNameWithID,
  getGenreNameWithID,
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

export async function devGamesGet(req, res) {
  const gameArr = await getGamesInfoByDevID(req.params.id);
  const devName = await getDevNameWithID(req.params.id);
  res.render("devPage", {
    gameArr,
    devHeader: "Developer",
    genreHeader: "Main Genre",
    devName: devName[0].dev,
  });
}

export async function genreGamesGet(req, res) {
  const gameArr = await getGamesInfoByGenreID(req.params.id);
  const genreName = await getGenreNameWithID(req.params.id);
  res.render("genrePage", {
    gameArr,
    devHeader: "Main Developer",
    genreHeader: "Genre",
    genreName: genreName[0].genre,
  });
}

export async function gamePageGet(req, res) {
  const devArr = await getDevList();
  const genreArr = await getGenreList();
  res.render("gamePage", {
    devArr,
    genreArr,
    script: "addGame.js",
    otherDev: [],
    otherGenre: [],
  });
}

export async function addDevPageGet(req, res) {
  const gameArr = await getAllGamesInfo();
  res.render("addDev", { gameArr, gamesMd: [] });
}

export async function addGenrePageGet(req, res) {
  const gameArr = await getAllGamesInfo();
  res.render("addGenre", { gameArr, gamesInc: [] });
}
