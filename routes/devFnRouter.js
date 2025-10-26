import { Router } from "express";
import {
  updateGamePageGet,
  devGamesGet,
  updateDevPageGet,
} from "../controllers/readDB.js";

import { updateGame, updateDev } from "../controllers/putToDB.js";
import { delDev } from "../controllers/deleteFromDB.js";

const devFnRouter = Router();

devFnRouter.get("/:id", devGamesGet);

devFnRouter.get("/edtGamePg/:id", updateGamePageGet);
devFnRouter.post("/edtGamePg/:id", updateGame);

devFnRouter.get("/edtDevPg/:id", updateDevPageGet);
devFnRouter.post("/edtDevPg/:id", updateDev);

devFnRouter.post("/delDev/:id", delDev);

export default devFnRouter;
