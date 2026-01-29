// Load project array fresh from localStorage
let project = JSON.parse(localStorage.getItem('projectSave')) || [];

// Generate a unique 20-character ID
function generateId() {
  const length = 20;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// NEXT button: create new project
document.querySelector('#nextButton').addEventListener('click', () => {
  const newProject = {
    projectId: generateId(),
    title: document.getElementById('projectTitle').value,
    description: document.getElementById('projectDescription').value,
    startDate: document.getElementById('startDate').value,
    endDate: document.getElementById('endDate').value,
    priority: document.getElementById('projectPriority').value,
    projectStatus: 'In progress',
    subtasks: [],
    totalSubtasks: [],
    finishedSubtasks: []
  };

  project.push(newProject);
  localStorage.setItem('projectSave', JSON.stringify(project));
  localStorage.setItem('currentProjectId', newProject.projectId);

  // Show subtasks section
  document.getElementById('projectForm').classList.add('hide');
  document.getElementById('subtasks').classList.remove('hide');
});

// ADD SUBTASK button: push to the correct project and save immediately
document.getElementById('addSubtask').addEventListener('click', () => {
  const subtaskValue = document.getElementById('subtask-desc').value.trim();
  if (!subtaskValue) return; // ignore empty input

  const project = JSON.parse(localStorage.getItem('projectSave')) || [];
  const currentId = localStorage.getItem('currentProjectId');
  const currentProject = project.find(p => p.projectId === currentId);

  if (!currentProject) return;
  currentProject.totalSubtasks.push(subtaskValue);
  localStorage.setItem('projectSave', JSON.stringify(project));
  
  // Display subtasks
  document.querySelector('.subtask-list').innerHTML = currentProject.subtasks
  .map(sub => `<li>${sub}</li>`)
  .join('');
  
  document.getElementById('subtask-desc').value = '';
});

// SUBMIT button: data already saved; you can log or navigate
document.querySelector('#submitButton').addEventListener('click', () => {
  
});
