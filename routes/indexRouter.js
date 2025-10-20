import { Router } from "express";
import {
  homePageGet,
  devPageGet,
  genrePageGet,
  gamePageGet,
} from "../controllers/readDB.js";

import { addNewGame } from "../controllers/postToDB.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);

indexRouter.get("/devPage/:id", devPageGet);

indexRouter.get("/genrePage/:id", genrePageGet);

indexRouter.get("/gamePage", gamePageGet);

indexRouter.post("/gamePage", addNewGame);

export default indexRouter;
