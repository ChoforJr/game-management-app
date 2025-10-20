const mainDevSelect = document.querySelector("#mainDev");
const devCheckboxWrappers = document.querySelectorAll(
  ".otherDevs .dev-checkbox-wrapper"
);
const mainGenreSelect = document.querySelector("#mainGenres");
const genreCheckboxWrappers = document.querySelectorAll(
  ".otherGenres .genre-checkbox-wrapper"
);

function updateAvailableDevs() {
  const selDevValue = mainDevSelect.options[mainDevSelect.selectedIndex].value;

  devCheckboxWrappers.forEach((wrapper) => {
    const checkbox = wrapper.querySelector('input[type="checkbox"]');

    if (checkbox.value === selDevValue) {
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
  const selGenreValue =
    mainGenreSelect.options[mainGenreSelect.selectedIndex].value;

  genreCheckboxWrappers.forEach((wrapper) => {
    const checkbox = wrapper.querySelector('input[type="checkbox"]');
    if (checkbox.value === selGenreValue) {
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
