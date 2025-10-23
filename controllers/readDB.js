import {
  getAllGamesInfo,
  getDevList,
  getGenreList,
  getGamesInfoByDevID,
  getGamesInfoByGenreID,
  getGameInfoById,
  getDevsByGameId,
  getGenreByGameId,
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
  res.render("devPage", {
    gameArr,
    devHeader: "Developer",
    genreHeader: "Main Genre",
    devName: gameArr[0].dev,
  });
}

export async function genreGamesGet(req, res) {
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
    pageState: "Add New Game",
    submitState: "Submit",
    action: "gamePage",
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

export async function updateGamePageGet(req, res) {
  const gameArrByID = await getGameInfoById(req.params.id);
  const otherDevArr = await getDevsByGameId(req.params.id);
  const otherGenreArr = await getGenreByGameId(req.params.id);
  const devArr = await getDevList();
  const genreArr = await getGenreList();

  otherDevArr
    .fill((item) => item.id !== gameArrByID[0].main_dev)
    .map((item) => item.id);

  otherGenreArr
    .fill((item) => item.id !== gameArrByID[0].main_genre)
    .map((item) => item.id);

  res.render("gamePage", {
    pageState: `Edit Game With ID: ${req.params.id}`,
    submitState: "Submit Changes",
    action: `gamePage/${req.params.id}`,
    devArr,
    genreArr,
    script: "editGame.js",
    otherDev: otherDevArr,
    otherGenre: otherGenreArr,
    game: gameArrByID[0].game,
    year: gameArrByID[0].res_year,
    sales: gameArrByID[0].sales_in_millions,
    sales: gameArrByID[0].sales_in_millions,
    mainDev: gameArrByID[0].main_dev,
    mainGenres: gameArrByID[0].main_genre,
  });
}
