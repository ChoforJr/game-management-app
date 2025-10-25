import { Router } from "express";
import {
  homePageGet,
  gamePageGet,
  addDevPageGet,
  addGenrePageGet,
  updateGamePageGet,
} from "../controllers/readDB.js";

import { addNewGame, addNewDev, addNewGenre } from "../controllers/postToDB.js";
import { updateGame } from "../controllers/putToDB.js";

import devFnRouter from "./devFnRouter.js";
import genreFnRouter from "./genreFnRouter.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);

indexRouter.use("/devPage/", devFnRouter);

indexRouter.use("/genrePage/", genreFnRouter);

indexRouter.get("/gamePage", gamePageGet);
indexRouter.post("/gamePage", addNewGame);

indexRouter.get("/addDev", addDevPageGet);
indexRouter.post("/addDev", addNewDev);

indexRouter.get("/addGenre", addGenrePageGet);
indexRouter.post("/addGenre", addNewGenre);

indexRouter.get("/edtGamePg/:id", updateGamePageGet);
indexRouter.post("/edtGamePg/:id", updateGame);

export default indexRouter;
