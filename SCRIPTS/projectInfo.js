import { loadSideBar } from "./sidebar.js";

loadSideBar();

// Load projects
let project = JSON.parse(localStorage.getItem("projectSave")) || [];


// Get project ID from URL
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

// Find current project
const projectInfo = project.find(p => p.projectId === projectId);

// Basic project info
document.querySelector(".title").innerHTML = projectInfo.title || "Untitled Project";
document.querySelector(".project-description").innerHTML = projectInfo.description || "No description provided.";

// Project card
document.querySelector(".card").innerHTML = `
  <div class="top">
    <div>
      <p class="up">Start Date</p>
      <p class="down">${projectInfo.startDate || "Not specified"}</p>
    </div>

    <div>
      <p class="up">Due Date</p>
      <p class="down">${projectInfo.endDate || "Not specified"}</p>
    </div>

    <div>
      <p class="up">Priority</p>
      <p class="down">${projectInfo.priority || "Not specified"}</p>
    </div>

    <div>
      <p class="up">Status</p>
      <p class="down">In progress</p>
    </div>
  </div>

  <div class="bottom">
    <div class="up">
      <p>Overall Progress</p>
      <p class="progressPercent">65%</p>
    </div>

    <div class="progressbar">
      <div class="progress"></div>
    </div>
  </div>
`;

//Progress logic
function updateProgress() {
  const totalSubtasks = projectInfo.totalSubtasks.length;
  const completedSubtasks = projectInfo.finishedSubtasks.length;
  const progressPercent = totalSubtasks === 0 ? 0 : Math.round((completedSubtasks / totalSubtasks) * 100);
  document.querySelector(".progress").style.width = progressPercent + "%";
  document.querySelector(".progressPercent").innerHTML = progressPercent + "%";
  if (progressPercent === 100) {
    projectInfo.projectStatus = "Completed";
    localStorage.setItem("projectSave", JSON.stringify(project));
  }
  else if (progressPercent < 100) 
  {
    projectInfo.projectStatus = "In progress";
    localStorage.setItem("projectSave", JSON.stringify(project));
  }
}
updateProgress();


//Add subtask
document.querySelector(".addSubtaskBtn").addEventListener("click", () => {
  document.querySelector(".addSubtaskSection").style.display = "flex";
});
document.querySelector("#submitSubtask").addEventListener("click", () => {
  const subtaskInput = document.querySelector("#subtaskInput");
  const subtask = subtaskInput.value.trim();
  subtaskInput.value = "";
  document.querySelector(".addSubtaskSection").style.display = "none";
  projectInfo.subtasks.push(subtask);
  projectInfo.totalSubtasks.push(subtask)
  localStorage.setItem("projectSave", JSON.stringify(project));
  renderSubtasks();
  updateProgress();
});

//Update Subtask
function updateSubtasks()
{
  projectInfo.subtasks = [...projectInfo.totalSubtasks.filter(sub => !projectInfo.finishedSubtasks.includes(sub))];
}

// Render subtasks
function renderSubtasks() {
  updateSubtasks();
  const renderedSubtasks = projectInfo.subtasks
  .map((subtask) => `
  <li style="margin-bottom: 1rem;">
  <label class="checkbox">
  <div class="left">
  <input type="checkbox" class="check-box subtask-check " data-subtask="${subtask}">
  <span class="custom-checkbox"></span> ${subtask}
  </div>
  <div class="right">
  <p class="date">
  ${projectInfo.endDate || "No date specified"}
              <span class="priority">${projectInfo.priority}</span>
            </p>
            </div>
        </label>
        </li>
        `)
        .join("");
        
        document.querySelector(".subtask-list").innerHTML = renderedSubtasks;
        
        // Checkbox strike-through logic
        document.querySelectorAll(".check-box").forEach(box => {
          box.addEventListener("change", () => {
            box.parentElement.style.textDecoration = box.checked ? "line-through" : "none";
          });
        });
}

renderSubtasks();

// Complete subtasks button
document.querySelector("#completeSubtasks").addEventListener("click", () => {
  document.querySelectorAll(".subtask-check:checked").forEach(box => {
    const subtask = box.dataset.subtask;

    if (!projectInfo.finishedSubtasks.includes(subtask)) {
      projectInfo.finishedSubtasks.push(subtask);
    }
  });

  localStorage.setItem("projectSave", JSON.stringify(project));
  localStorage.setItem("currentProjectId", projectInfo.projectId);
  renderSubtasks();
  updateProgress();
});

