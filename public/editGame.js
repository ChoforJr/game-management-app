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

const submitBtn = document.querySelector(".submitBtn");
const form = document.querySelector("form");

async function submitFn(event) {
  event.preventDefault();
  const elementID = event.currentTarget.id;

  const formData = new FormData(form);
  const bodyData = new URLSearchParams(formData).toString();

  try {
    const response = await fetch(`/edtGamePg/${elementID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyData,
    });

    if (response.ok) {
      console.log("Game saved successfully. Redirecting...");
      window.location.href = "/";
    } else {
      const responseStatus = response.status;
      const responseBody = await response.text();

      if (responseStatus === 400) {
        console.error("Validation failed (400). Displaying error page.");

        document.open();
        document.write(responseBody);
        document.close();
      } else {
        console.error(`Server Error: Status ${responseStatus}.`);
        console.error(responseBody);
      }
    }
  } catch (error) {
    console.error("Network or parsing error:", error.message);
    alert("A network error occurred. Please try again.");
  }
}
submitBtn.addEventListener("click", submitFn);
