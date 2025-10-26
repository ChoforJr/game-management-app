import {
  delGameQuery,
  delDevQuery,
  delGenreQuery,
  clearAndPopulate,
} from "../db/queiresDelete.js";

export async function delGame(req, res) {
  await delGameQuery(req.params.id);
  res.redirect("/");
}

export async function delDev(req, res) {
  await delDevQuery(req.params.id);
  res.redirect("/");
}

export async function delGenre(req, res) {
  await delGenreQuery(req.params.id);
  res.redirect("/");
}

export async function reverseAll(req, res) {
  await clearAndPopulate();
  res.redirect("/");
}
