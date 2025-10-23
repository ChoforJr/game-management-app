import {
  mainDevSelect,
  mainGenreSelect,
  updateAvailableDevs,
  updateAvailableGenres,
} from "./addGame.js";

updateAvailableDevs();
updateAvailableGenres();

mainDevSelect.addEventListener("change", updateAvailableDevs);
mainGenreSelect.addEventListener("change", updateAvailableGenres);
