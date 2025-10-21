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

export async function insertDev(newDev, yearFd, gamesMd) {
  await Pool.query(
    `
    WITH inserted_dev AS (
        INSERT INTO developers (dev, found_year)
        VALUES ($1, $2)
        RETURNING id
    )
        INSERT INTO games_devs (dev_id, game_id)
        SELECT
            indev.id AS dev_id,
            UNNEST($3::int[]) AS game_id
        FROM inserted_dev indev
        RETURNING dev_id;
    `,
    [newDev, yearFd, gamesMd]
  );
}

export async function insertGenre(newGenre, gamesInc) {
  await Pool.query(
    `
    WITH inserted_genres AS (
        INSERT INTO genres (genre)
        VALUES ($1)
        RETURNING id
    )
        INSERT INTO games_genres (genre_id, game_id)
        SELECT
            insGen.id AS genre_id,
            UNNEST($2::int[]) AS game_id
        FROM inserted_genres insGen
        RETURNING genre_id;
    `,
    [newGenre, gamesInc]
  );
}
