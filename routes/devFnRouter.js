import { Router } from "express";
import { updateGamePageGet, devGamesGet } from "../controllers/readDB.js";

import { updateGame } from "../controllers/putToDB.js";

const devFnRouter = Router();

devFnRouter.get("/:id", devGamesGet);

devFnRouter.get("/edtGamePg/:id", updateGamePageGet);
devFnRouter.post("/edtGamePg/:id", updateGame);

export default devFnRouter;
