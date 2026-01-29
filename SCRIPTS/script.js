let isOpen = false;

const addProjectBtn = document.getElementById("addProjectBtn");
const cancelButton = document.querySelector(".cancelButton");
const addProjectPanel = document.querySelector(".addProject");
const nextButton = document.querySelector("#nextButton");

changeBG();

/* ---------- OPEN PANEL ---------- */
if (addProjectBtn && addProjectPanel) {
  addProjectBtn.addEventListener("click", () => {
    isOpen = true;
    addProjectPanel.classList.remove("hide");
    changeBG();
  });
}

/* ---------- CLOSE PANEL ---------- */
if (cancelButton && addProjectPanel) {
  cancelButton.addEventListener("click", () => {
    isOpen = false;
    addProjectPanel.classList.add("hide");
    changeBG();
  });

  cancelButton.addEventListener("mouseover", () => {
    if (nextButton) {
      nextButton.style.backgroundColor = "rgba(255, 255, 255, 0.22)";
    }
  });

  cancelButton.addEventListener("mouseout", () => {
    if (nextButton) {
      nextButton.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    }
  });
}

/* ---------- BACKGROUND LOGIC ---------- */
function changeBG() {
  document.body.style.backgroundColor = isOpen
    ? "rgba(0, 0, 0, 0.5)"
    : "#e0f7fa";
}

/* ---------- OPEN PANEL VIA URL ---------- */
const params = new URLSearchParams(window.location.search);
const openPanel = params.get("openPanel");

if (openPanel === "true" && addProjectPanel) {
  isOpen = true;
  addProjectPanel.classList.remove("hide");
  changeBG();
}
