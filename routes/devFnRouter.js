import { Router } from "express";
import {
  updateGamePageGet,
  devGamesGet,
  updateDevPageGet,
} from "../controllers/readDB.js";

import { updateGame, updateDev } from "../controllers/putToDB.js";

const devFnRouter = Router();

devFnRouter.get("/:id", devGamesGet);

devFnRouter.get("/edtGamePg/:id", updateGamePageGet);
devFnRouter.post("/edtGamePg/:id", updateGame);

devFnRouter.get("/edtDevPg/:id", updateDevPageGet);
devFnRouter.post("/edtDevPg/:id", updateDev);

export default devFnRouter;
