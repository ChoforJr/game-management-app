import { Router } from "express";
import { updateGamePageGet, genreGamesGet } from "../controllers/readDB.js";

import { updateGame } from "../controllers/putToDB.js";

const genreFnRouter = Router();

genreFnRouter.get("/:id", genreGamesGet);

genreFnRouter.get("/edtGamePg/:id", updateGamePageGet);
genreFnRouter.post("/edtGamePg/:id", updateGame);

export default genreFnRouter;
