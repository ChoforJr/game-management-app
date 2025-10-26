import { delGameQuery } from "../db/queiresDelete.js";

export async function delGame(req, res) {
  await delGameQuery(req.params.id);
  res.redirect("/");
}
