import Pool from "./pool.js";

export async function getAllGamesInfo() {
  const { rows } = await Pool.query(
    `SELECT games.id AS id, games.game AS game, games.res_year AS year, 
    developers.dev AS dev, genres.genre AS genre, games.sales_in_millions AS sales 
    FROM games JOIN developers ON games.main_dev=developers.id JOIN genres ON games.main_genre=genres.id;`
  );
  return rows;
}

export async function getDevList() {
  const { rows } = await Pool.query(
    "SELECT developers.id AS id, developers.dev AS dev FROM  developers;"
  );
  return rows;
}

export async function getGenreList() {
  const { rows } = await Pool.query(
    "SELECT genres.id AS id, genres.genre AS genre FROM  genres;"
  );
  return rows;
}

export async function getGamesInfoByDevID(devId) {
  const { rows } = await Pool.query(
    `
    SELECT games.id AS id, games.game AS game, games.res_year AS year, 
    developers.dev AS dev, genres.genre AS genre, games.sales_in_millions AS sales 
    FROM games INNER JOIN games_devs ON games.id=games_devs.game_id 
    INNER JOIN developers ON games_devs.dev_id = developers.id
    INNER JOIN genres ON games.main_genre=genres.id
    WHERE developers.id = $1;
    `,
    [devId]
  );
  return rows;
}

export async function getGamesInfoByGenreID(genreId) {
  const { rows } = await Pool.query(
    `
    SELECT games.id AS id, games.game AS game, games.res_year AS year, 
    developers.dev AS dev, genres.genre AS genre, games.sales_in_millions AS sales 
    FROM games INNER JOIN games_genres ON games.id=games_genres.game_id 
    INNER JOIN genres ON games_genres.genre_id = genres.id
    INNER JOIN developers ON games.main_dev=developers.id
    WHERE genres.id = $1;
    `,
    [genreId]
  );
  return rows;
}

export async function getGameInfoById(gameId) {
  const { rows } = await Pool.query(
    `
    SELECT * FROM games WHERE games.id = $1;
    `,
    [gameId]
  );
  return rows;
}

export async function getDevsByGameId(gameId) {
  const gameInfo = await getGameInfoById(gameId);
  const mainDev = gameInfo[0].main_dev;
  const { rows } = await Pool.query(
    `
    SELECT dev_id AS id FROM games_devs 
    WHERE game_id = $1 AND dev_id !=$2;
    `,
    [gameId, mainDev]
  );
  return rows;
}

export async function getGenreByGameId(gameId) {
  const gameInfo = await getGameInfoById(gameId);
  const mainGenre = gameInfo[0].main_genre;
  const { rows } = await Pool.query(
    `
    SELECT genre_id AS id FROM games_genres 
    WHERE game_id = $1 AND genre_id !=$2;
    `,
    [gameId, mainGenre]
  );
  return rows;
}
