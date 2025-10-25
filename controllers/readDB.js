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
    devID: req.params.id,
    script: "mod.js",
    gameArr,
    devHeader: "Developer",
    genreHeader: "Main Genre",
    devName: devInfo[0].dev,
    devYear: devInfo[0].year,
  });
}

export async function genreGamesGet(req, res) {
  const gameArr = await getGamesInfoByGenreID(req.params.id);
  const genreInfo = await getGenreInfoByID(req.params.id);
  res.render("genrePage", {
    genreID: req.params.id,
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
  res.render("addDev", {
    newDev: "",
    yearFd: "",
    gameArr,
    gamesMd: [],
    pageState: "Add New Developer",
    submitState: "Submit",
    action: "addDev",
  });
}

export async function addGenrePageGet(req, res) {
  const gameArr = await getAllGamesInfo();
  res.render("addGenre", {
    newGenre: "",
    gameArr,
    gamesInc: [],
    pageState: "Add New Genre",
    submitState: "Submit",
    action: "addGenre",
  });
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

export async function updateDevPageGet(req, res) {
  const gameArr = await getAllGamesInfo();
  const gameArrInfo = await getGamesInfoByDevID(req.params.id);
  const devInfo = await getDevInfoByID(req.params.id);
  res.render("addDev", {
    newDev: devInfo[0].dev,
    yearFd: devInfo[0].year,
    gameArr,
    gamesMd: gameArrInfo.map((item) => item.id),
    pageState: `Edit Developer of ID: ${req.params.id}`,
    submitState: "Submit changes",
    action: `devPage/edtDevPg/${req.params.id}`,
  });
}

export async function updateGenrePageGet(req, res) {
  const gameArr = await getAllGamesInfo();
  const gameArrInfo = await getGamesInfoByGenreID(req.params.id);
  const genreInfo = await getGenreInfoByID(req.params.id);
  res.render("addGenre", {
    newGenre: genreInfo[0].genre,
    gameArr,
    gamesInc: gameArrInfo.map((item) => item.id),
    pageState: `Edit Genre of ID: ${req.params.id}`,
    submitState: "Submit changes",
    action: `genrePage/edtGenrePg/${req.params.id}`,
  });
}
