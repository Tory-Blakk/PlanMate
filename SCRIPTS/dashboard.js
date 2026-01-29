import { loadSideBar } from "./sidebar.js";
loadSideBar();
let project = JSON.parse(localStorage.getItem('projectSave')) || [];
let dashboardProjects = project.filter(p => p.projectStatus !== 'Completed') || JSON.parse(localStorage.getItem('dashboardProjects'));
let projectListHtml = '';

localStorage.setItem('dashboardProjects', JSON.stringify(dashboardProjects));
const renderedProjects = [...project.filter(p => dashboardProjects.includes(p))];

if (renderedProjects.length === 0)
{
  document.querySelector('.card-grid').innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"> <p style="font-size: 1.5rem; color: #555; margin-top: -4rem;">No projects available. Please add a project.</p></div>`;
}
renderedProjects.forEach((project) => {
  const progressPercent = project.totalSubtasks.length === 0? 0: Math.round((project.finishedSubtasks.length / project.totalSubtasks.length) * 100);
  projectListHtml += `<li class="card" data-projectid="${project.projectId}">
  <div class="top">
  <p class="title">${project.title}</p>
  <p class="priority" id="priority-${project.projectId}">${project.priority}</p>
  </div>
  <p class="description">${project.description}</p>
  <div class="progressBar">
  <p class="progressPercent" style="color: ${progressPercent > 52 ? '#eeeeeeff' : progressPercent > 46 && progressPercent < 52 ? '#000000ff' : '#959c9e'}">${progressPercent}%</p>
  <div class="progress" style="width: ${progressPercent}%"></div>
  </div>
  </div>
  <div class="bottom">
  <p class="date">Due: ${project.endDate}</p>
  </div>
  </li>`
    document.querySelector('.card-grid').innerHTML = projectListHtml;
    let priority = document.querySelectorAll('.priority');


    priority.forEach(priority => {
    if (priority.innerHTML === 'High')
    {
      priority.style.backgroundColor = "#FFE1E1"; // slightly stronger red tint
      priority.style.color = "#9F1D1D";           // deeper danger red
      priority.style.border = "1px solid #F87171"; // more visible border
    }
    else if (priority.innerHTML === 'Medium')
    {
      priority.style.backgroundColor = "#FFE8CC"; // warmer orange tint
      priority.style.color = "#92400E";           // darker amber text
      priority.style.border = "1px solid #FDBA74"; // noticeable but soft
    }
    else if (priority.innerHTML === 'Low')
    {
      priority.style.backgroundColor = "#DFF7EA"; // brighter mint
      priority.style.color = "#065F46";           // confident dark green
      priority.style.border = "1px solid #34D399"; // crisp green edge
    }

    });
  });

  document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.dataset.projectid; // optional if you want to pass ID
    // navigate to another page
    window.location.href = `../HTML/projectInfo.html?id=${projectId}`;
  });
});

   
 

