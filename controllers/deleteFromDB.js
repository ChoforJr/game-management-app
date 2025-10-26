import { delGameQuery, delDevQuery } from "../db/queiresDelete.js";

export async function delGame(req, res) {
  await delGameQuery(req.params.id);
  res.redirect("/");
}

export async function delDev(req, res) {
  await delDevQuery(req.params.id);
  res.redirect("/");
}
