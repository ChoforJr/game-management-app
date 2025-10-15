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
    `[devId]
  );
  return rows;
}

export async function insertMessage(user, message) {
  await Pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
    user,
    message,
  ]);
}

export async function searchMessageByID(id) {
  const result = await Pool.query(
    "SELECT username AS user, text, added FROM messages WHERE id = $1",
    [id]
  );

  return result.rows;
}
