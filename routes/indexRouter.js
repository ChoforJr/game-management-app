import { Router } from "express";
import {
  homePageGet,
  devPageGet,
  genrePageGet,
  gamePageGet,
} from "../controllers/readDB.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);
indexRouter.get("/devPage/:id", devPageGet);
indexRouter.get("/genrePage/:id", genrePageGet);
indexRouter.get("/gamePage", gamePageGet);

export default indexRouter;
