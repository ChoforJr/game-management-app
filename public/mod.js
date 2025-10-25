const updateBtns = document.querySelectorAll(".updateBtn");

async function handleUpdateBtn(event) {
  const elementId = event.currentTarget.id;

  try {
    window.location.href = `edtGamePg/${elementId}`;
  } catch (error) {
    console.error("Error:", error);
  }
}

updateBtns.forEach((button) => {
  button.addEventListener("click", handleUpdateBtn);
});
