import express from "express";
import indexRouter from "./routes/indexRouter.js";
import path from "node:path";

const app = express();

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`listening on port ${PORT}!`);
});
