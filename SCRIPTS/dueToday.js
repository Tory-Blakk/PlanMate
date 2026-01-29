import { loadSideBar } from "./sidebar.js";
loadSideBar();
let dueTodayProjectsHtml = '';

let projects = JSON.parse(localStorage.getItem ("projectSave")) || [];

let dueTodayProjects = projects.filter(p => {
  const today = new Date();
  const endDate = new Date(p.endDate);
  return endDate.toDateString() === today.toDateString() && p.projectStatus !== 'Completed';
}) || []; 

if(dueTodayProjects.length === 0)
{
  document.querySelector('.card-grid').innerHTML = `<div class="no-projects">No projects due today.</p></div>`;
  document.body.style.overflow = "hidden";
}

const dateTitle = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById('dateTitle').innerText = `${dateTitle}`;

dueTodayProjects.forEach((project) => {
  dueTodayProjectsHtml = `
    <li>
      <p class="project-title">${project.title}</p>
      <p class="subtask-no">${project.totalSubtasks.length - project.finishedSubtasks.length} subtasks left</p>
      <div class="priority-container">
      <p class="priority">${project.priority} priority</p>
      </div>
    </li>
  `
  document.querySelector('.card-grid').innerHTML += dueTodayProjectsHtml;
    let priority = document.querySelectorAll('.priority');
     priority.forEach(priority => {
    if (priority.innerHTML === 'High priority')
    {
      priority.style.backgroundColor = "#FFE1E1"; // slightly stronger red tint
      priority.style.color = "#9F1D1D";           // deeper danger red
      priority.style.border = "1px solid #F87171"; // more visible border
    }
    else if (priority.innerHTML === 'Medium priority')
    {
      priority.style.backgroundColor = "#FFE8CC"; // warmer orange tint
      priority.style.color = "#92400E";           // darker amber text
      priority.style.border = "1px solid #FDBA74"; // noticeable but soft
    }
    else if (priority.innerHTML === 'Low priority')
    {
      priority.style.backgroundColor = "#DFF7EA"; // brighter mint
      priority.style.color = "#065F46";           // confident dark green
      priority.style.border = "1px solid #34D399"; // crisp green edge
    }
    });
  });
