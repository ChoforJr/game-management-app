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
