const getDev = document.querySelector("#developers");

getDev.addEventListener("change", handleOptionChangeDev);

function handleOptionChangeDev(event) {
  const selectedValue = this.value;

  if (selectedValue) {
    window.location.href = selectedValue;
  }
}
const getGenre = document.querySelector("#genres");

getGenre.addEventListener("change", handleOptionChangeGenre);

function handleOptionChangeGenre(event) {
  const selectedValue = this.value;

  if (selectedValue) {
    window.location.href = selectedValue;
  }
}
