import { loadSideBar } from "./sidebar.js";
loadSideBar();

// Load projects array
let projects = JSON.parse(localStorage.getItem("projectSave")) || [];
let selectedProjectId; // set this when row is clicked

const tbody = document.querySelector("tbody");

function shortenText(text, maxLength)
{
  if (text.length > maxLength) 
  {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}


// Render table rows FIRST
projects.forEach(project => {
  const shortenedTitle = shortenText(project.title, 20);
    
  const progressPercent =
  project.totalSubtasks.length === 0? 0: Math.round( (project.finishedSubtasks.length / project.totalSubtasks.length) * 100);
  const row = document.createElement("tr");
  if (progressPercent < 100) 
  {
    project.projectStatus = "In progress";
    localStorage.setItem("projectSave", JSON.stringify(projects));
  }
  row.innerHTML = `
    <td class="column-one">${shortenedTitle}</td>
    <td class="status">${progressPercent === 100 ? "Completed" : "In progress"}</td>
    <td class="progress-column">
      <div class="progressbar">
        <div class="progress" style="width:${progressPercent}%"></div>
      </div>
      <span class="progressPercent">${progressPercent}%</span>
    </td>
    <td class="due-date">${project.endDate || "No date"}</td>
    <td class="priority">${project.priority}</td>
  `;

    let priority = document.querySelectorAll('.priority');
    priority.forEach(priority => {
    if (priority.innerHTML === 'High')
    {
      priority.style.color = "#9F1D1D";           // deeper danger red
    }
    else if (priority.innerHTML === 'Medium')
    {
      priority.style.color = "#92400E";           // darker amber text
    }
    else if (priority.innerHTML === 'Low')
    {
      priority.style.color = "#065F46";           // confident dark green
    }

    });

  // Row click → open modal
 row.addEventListener("click", (e) => {
  const modal = document.getElementById("js-popup-modal");

  selectedProjectId = project.projectId;

  // 1️⃣ Show FIRST so dimensions exist
  modal.classList.remove("hide");

  let x = e.clientX;
  let y = e.clientY;

  // 2️⃣ Measure AFTER showing
  const modalWidth = modal.offsetWidth;
  const modalHeight = modal.offsetHeight;

  // 3️⃣ Clamp to viewport
  if (x + modalWidth > window.innerWidth) {
    x = window.innerWidth - modalWidth - 10;
  }

  if (y + modalHeight > window.innerHeight) {
    y = window.innerHeight - modalHeight - 10;
  }

  // Optional: prevent left/top overflow too
  x = Math.max(10, x);
  y = Math.max(10, y);

  // 4️⃣ Position
  modal.style.left = `${x-50}px`;
  modal.style.top = `${y-50}px`;

  const warning = document.querySelector(".warning");
  warning.textContent = project.title;

});

  tbody.appendChild(row);
});

// Modal buttons (add ONCE)
document.getElementById("next")?.addEventListener("click", (e) => {
  const confirmationModal = document.getElementById("confirmation-modal");

  // Show FIRST (but invisible)
  confirmationModal.classList.remove("hide");

  let x = e.clientX;
  let y = e.clientY;

  // Measure AFTER showing
  const modalWidth = confirmationModal.offsetWidth;
  const modalHeight = confirmationModal.offsetHeight;

  // Prevent overflow
  if (x + modalWidth > window.innerWidth) {
    x = window.innerWidth - modalWidth - 10;
  }

  if (y + modalHeight > window.innerHeight) {
    y = window.innerHeight - modalHeight - 10;
  }

  // 4️⃣ Position
  confirmationModal.style.left = `${x-200}px`;
  confirmationModal.style.top = `${y-90}px`;

  // Hide previous modal
  document.getElementById("js-popup-modal").classList.add("hide");
});

document.getElementById("delete")?.addEventListener("click", () => {
  projects = projects.filter(
    project => project.projectId !== selectedProjectId
  );

  localStorage.setItem("projectSave", JSON.stringify(projects));

  document.getElementById("confirmation-modal").classList.add("hide");

  setTimeout(() => {
    location.reload();
  }, 300);
});

document.querySelectorAll(".cancel")?.forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("js-popup-modal").classList.remove("hide");
    document.getElementById("confirmation-modal").classList.add("hide");

  });
});

// Open project button in modal
document.querySelector(".popup-modal .open")?.addEventListener("click", () => {
  if (selectedProjectId) {
    window.location.href = `../projectInfo.html?id=${selectedProjectId}`;
  }
});


let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", () => {
  let filter = searchBar.value.toLowerCase();
  let searchRows = tbody.getElementsByTagName("tr");
  for (let i = 0; i < searchRows.length; i++) {
    let titleCell = searchRows[i].getElementsByClassName("column-one")[0];
    let titleText = titleCell.textContent || titleCell.innerText;
    if (titleText.toLowerCase().indexOf(filter) > -1) {
      searchRows[i].style.display = "";
    } else {
      searchRows[i].style.display = "none";
    }
  }
});

// // Close modal on outside click
// window.addEventListener("click", (e) => {
//   const modal = document.getElementById("js-popup-modal");
//   if (!modal.classList.contains("hide") && !modal.contains(e.target))
//   {
//     modal.classList.add("hide");
//   }
// })