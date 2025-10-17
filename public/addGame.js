// Wait for the document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const mainDevSelect = document.querySelector("#mainDev");
  const devCheckboxWrappers = document.querySelectorAll(
    ".otherDevs .dev-checkbox-wrapper"
  );
  const mainGenreSelect = document.querySelector("#mainGenres");
  const genreCheckboxWrappers = document.querySelectorAll(
    ".otherGenres .genre-checkbox-wrapper"
  );

  function updateAvailableDevs() {
    const selectedDevName =
      mainDevSelect.options[mainDevSelect.selectedIndex].text;

    devCheckboxWrappers.forEach((wrapper) => {
      const checkbox = wrapper.querySelector('input[type="checkbox"]');

      if (checkbox.id === selectedDevName) {
        wrapper.style.display = "none";
        checkbox.disabled = true;
        checkbox.checked = false;
      } else {
        wrapper.style.display = "block";
        checkbox.disabled = false;
      }
    });
  }
  function updateAvailableGenres() {
    const selectedGenreName =
      mainGenreSelect.options[mainGenreSelect.selectedIndex].text;

    genreCheckboxWrappers.forEach((wrapper) => {
      const checkbox = wrapper.querySelector('input[type="checkbox"]');
      if (checkbox.id === selectedGenreName) {
        wrapper.style.display = "none";
        checkbox.disabled = true;
        checkbox.checked = false;
      } else {
        wrapper.style.display = "block";
        checkbox.disabled = false;
      }
    });
  }

  updateAvailableDevs();
  updateAvailableGenres();

  mainDevSelect.addEventListener("change", updateAvailableDevs);
  mainGenreSelect.addEventListener("change", updateAvailableGenres);
});
