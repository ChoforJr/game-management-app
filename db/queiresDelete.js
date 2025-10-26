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
