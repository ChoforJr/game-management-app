import Pool from "./pool.js";

export async function editGame(
  game,
  year,
  mainDev,
  mainGenres,
  sales,
  otherDevMainDev,
  otherGenreMainGenre,
  gameID
) {
  // 1. Get a client from the pool to run a transaction
  const client = await Pool.connect();

  try {
    // Start the transaction
    await client.query("BEGIN");

    // 2. UPDATE the games table
    await client.query(
      `
      UPDATE games SET
          game = $1,
          res_year = $2,
          main_dev = $3,
          main_genre = $4,
          sales_in_millions = $5
      WHERE id = $6;
      `,
      [game, year, mainDev, mainGenres, sales, gameID]
    );

    // 3. DELETE old games_devs entries
    await client.query(
      `
      DELETE FROM games_devs
      WHERE game_id = $1
      AND dev_id <> ALL($2::int[]);
      `,
      [gameID, otherDevMainDev]
    );

    // 4. INSERT/UPSERT new games_devs entries
    await client.query(
      `
      INSERT INTO games_devs (game_id, dev_id)
      SELECT $1 AS game_id, UNNEST($2::int[]) AS dev_id
      ON CONFLICT (game_id, dev_id) DO NOTHING;
      `,
      [gameID, otherDevMainDev]
    );

    // 5. DELETE old games_genres entries
    await client.query(
      `
      DELETE FROM games_genres
      WHERE game_id = $1
      AND genre_id <> ALL($2::int[]);
      `,
      [gameID, otherGenreMainGenre]
    );

    // 6. INSERT/UPSERT new games_genres entries
    await client.query(
      `
      INSERT INTO games_genres (game_id, genre_id)
      SELECT $1 AS game_id, UNNEST($2::int[]) AS genre_id
      ON CONFLICT (game_id, genre_id) DO NOTHING;
      `,
      [gameID, otherGenreMainGenre]
    );

    // Commit the transaction on success
    await client.query("COMMIT");
  } catch (e) {
    // Rollback the transaction on any error
    await client.query("ROLLBACK");
    throw e; // Re-throw the error so the calling function can handle it
  } finally {
    // Release the client back to the pool
    client.release();
  }
}

export async function editDev(newDev, yearFd, gamesMdOrNot, devID) {
  const client = await Pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        UPDATE developers SET
            dev = $1,
            found_year = $2
        WHERE id = $3;
        `,
      [newDev, yearFd, devID]
    );

    await client.query(
      `
      UPDATE games SET
          main_dev = null
      WHERE main_dev = $1;
        `,
      [devID]
    );

    await client.query(
      `
        DELETE FROM games_devs
        WHERE dev_id = $1 
        AND game_id <> ALL($2::int[]);
        `,
      [devID, gamesMdOrNot]
    );

    await client.query(
      `
        INSERT INTO games_devs (game_id, dev_id)
        SELECT UNNEST($2::int[]) AS game_id, $1 AS dev_id
        ON CONFLICT (game_id, dev_id) DO NOTHING;
        `,
      [devID, gamesMdOrNot]
    );

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function editGenre(newGenre, gamesIncOrNot, genreID) {
  const client = await Pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        UPDATE genres SET
            genre = $1
        WHERE id = $2;
        `,
      [newGenre, genreID]
    );

    await client.query(
      `
      UPDATE games SET
          main_genre = null
      WHERE main_dev = $1;
        `,
      [genreID]
    );

    await client.query(
      `
        DELETE FROM games_genres
        WHERE genre_id = $1 
        AND game_id <> ALL($2::int[]);
        `,
      [genreID, gamesIncOrNot]
    );

    await client.query(
      `
        INSERT INTO games_genres (game_id, genre_id)
        SELECT UNNEST($2::int[]) AS game_id, $1 AS genre_id
        ON CONFLICT (game_id, genre_id) DO NOTHING;
        `,
      [genreID, gamesIncOrNot]
    );

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
