import {
  getAllGamesInfo,
  getDevList,
  getGenreList,
  getGamesInfoByDevID,
  getGamesInfoByGenreID,
  getGameInfoById,
  getDevsByGameId,
  getGenreByGameId,
  getDevInfoByID,
  getGenreInfoByID,
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
  const devInfo = await getDevInfoByID(req.params.id);
  res.render("devPage", {
    script: "mod.js",
    gameArr,
    devHeader: "Developer",
    genreHeader: "Main Genre",
    devName: devInfo[0].dev,
  });
}

export async function genreGamesGet(req, res) {
  const gameArr = await getGamesInfoByGenreID(req.params.id);
  const genreInfo = await getGenreInfoByID(req.params.id);
  res.render("genrePage", {
    script: "mod.js",
    gameArr,
    devHeader: "Main Developer",
    genreHeader: "Genre",
    genreName: genreInfo[0].genre,
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

  res.render("gamePage", {
    pageState: `Edit Game With ID: ${req.params.id}`,
    submitState: "Submit Changes",
    action: `edtGamePg/${req.params.id}`,
    devArr,
    genreArr,
    script: "addGame.js",
    otherDev: otherDevArr.map((item) => item.id),
    otherGenre: otherGenreArr.map((item) => item.id),
    game: gameArrByID[0].game,
    year: gameArrByID[0].res_year,
    sales: gameArrByID[0].sales_in_millions,
    mainDev: gameArrByID[0].main_dev,
    mainGenres: gameArrByID[0].main_genre,
    gameID: req.params.id,
  });
}
