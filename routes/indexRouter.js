import { Router } from "express";
import {
  homePageGet,
  devGamesGet,
  genreGamesGet,
  gamePageGet,
  addDevPageGet,
  addGenrePageGet,
} from "../controllers/readDB.js";

import { addNewGame, addNewDev, addNewGenre } from "../controllers/postToDB.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);

indexRouter.get("/devPage/:id", devGamesGet);

indexRouter.get("/genrePage/:id", genreGamesGet);

indexRouter.get("/gamePage", gamePageGet);
indexRouter.post("/gamePage", addNewGame);

indexRouter.get("/addDev", addDevPageGet);
indexRouter.post("/addDev", addNewDev);

indexRouter.get("/addGenre", addGenrePageGet);
indexRouter.post("/addGenre", addNewGenre);

export default indexRouter;
