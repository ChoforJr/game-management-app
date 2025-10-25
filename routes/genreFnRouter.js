import { Router } from "express";
import {
  updateGamePageGet,
  genreGamesGet,
  updateGenrePageGet,
} from "../controllers/readDB.js";

import { updateGame, updateGenre } from "../controllers/putToDB.js";

const genreFnRouter = Router();

genreFnRouter.get("/:id", genreGamesGet);

genreFnRouter.get("/edtGamePg/:id", updateGamePageGet);
genreFnRouter.post("/edtGamePg/:id", updateGame);

genreFnRouter.get("/edtGenrePg/:id", updateGenrePageGet);
genreFnRouter.post("/edtGenrePg/:id", updateGenre);

export default genreFnRouter;
