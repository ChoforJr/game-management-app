import Pool from "./pool.js";

export async function delGameQuery(params) {
  await Pool.query(
    `
        DELETE FROM games
        WHERE id = $1;
      `,
    [params]
  );
}

export async function delDevQuery(params) {
  await Pool.query(
    `
          DELETE FROM developers
          WHERE id = $1;
        `,
    [params]
  );
}

export async function delGenreQuery(params) {
  await Pool.query(
    `
            DELETE FROM genres
            WHERE id = $1;
          `,
    [params]
  );
}

export async function clearAndPopulate() {
  const client = await Pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
        DROP TABLE IF EXISTS games_devs;

        DROP TABLE IF EXISTS games_genres;

        DROP TABLE IF EXISTS games;

        DROP TABLE IF EXISTS developers;

        DROP TABLE IF EXISTS genres;
        `
    );

    await client.query(
      `
            CREATE TABLE IF NOT EXISTS developers (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            dev VARCHAR ( 255 ),
            found_year INTEGER
            );

            CREATE TABLE IF NOT EXISTS genres (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            genre VARCHAR ( 255 )
            );

            CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            game VARCHAR ( 255 ),
            res_year INTEGER,
            main_dev INTEGER REFERENCES developers (id) ON DELETE CASCADE,
            main_genre INTEGER REFERENCES genres (id) ON DELETE CASCADE,
            sales_in_millions INTEGER
            );

            CREATE TABLE IF NOT EXISTS games_devs (
            game_id INTEGER REFERENCES games (id) ON DELETE CASCADE,
            dev_id INTEGER REFERENCES developers (id) ON DELETE CASCADE,
            PRIMARY KEY (game_id, dev_id)
            );

            CREATE TABLE IF NOT EXISTS games_genres (
            game_id INTEGER REFERENCES games (id) ON DELETE CASCADE,
            genre_id INTEGER REFERENCES genres (id) ON DELETE CASCADE,
            PRIMARY KEY (game_id, genre_id)
            );
        `
    );

    await client.query(
      `
        INSERT INTO developers (dev, found_year) 
        VALUES
        ('Capcom', 1985),
        ('Nintendo', 1986),
        ('Insomiac', 2010);
        `
    );

    await client.query(
      `
        INSERT INTO genres (genre) 
        VALUES
        ('Adventure'),
        ('Action'),
        ('Horror');
          `
    );

    await client.query(
      `
        INSERT INTO games (game, res_year, main_dev, main_genre, sales_in_millions) 
        VALUES
        ('Resident Evil 4 Remake', 2022, 1, 3, 1300),
        ('Resident Evil 2 Remake', 2021, 1, 3, 1300),
        ('Mario Cart 2', 2025, 2, 1, 400),
        ('Spider Man PS4', 2018, 3, 2, 1300);
          `
    );

    await client.query(
      `
        INSERT INTO games_devs (game_id, dev_id) 
        VALUES (1, 1), (2, 1), (3, 2), (4, 3);
        `
    );

    await client.query(
      `
        INSERT INTO games_genres (game_id, genre_id) 
        VALUES (1, 3), (1, 2), (1, 1), (2, 3), (2, 2), (2, 1), (3, 1), (4, 1), (4, 2);
        `
    );

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
