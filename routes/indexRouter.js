import { Router } from "express";
import { homePageGet, devPageGet } from "../controllers/readDB.js";

const indexRouter = Router();

indexRouter.get("/", homePageGet);
indexRouter.get("/devPage/:id", devPageGet);

export default indexRouter;
