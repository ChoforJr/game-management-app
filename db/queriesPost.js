import Pool from "./pool.js";

export async function insertGame(
  game,
  year,
  mainDev,
  mainGenres,
  sales,
  otherDevMainDev,
  otherGenreMainGenre
) {
  await Pool.query(
    `
    WITH inserted_game AS (
        INSERT INTO games (game, res_year, main_dev, main_genre, sales_in_millions)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
    ),
    game_devs_insert AS (
        INSERT INTO games_devs (game_id, dev_id)
        SELECT
            ig.id AS game_id,
            UNNEST($6::int[]) AS dev_id
        FROM inserted_game ig
        RETURNING game_id
    )
    INSERT INTO games_genres (game_id, genre_id)
    SELECT
        ig.id AS game_id,
        UNNEST($7::int[]) AS genre_id
    FROM inserted_game ig
    RETURNING game_id;
    `,
    [
      game,
      year,
      mainDev,
      mainGenres,
      sales,
      otherDevMainDev,
      otherGenreMainGenre,
    ]
  );
}
