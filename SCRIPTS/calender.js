import { loadSideBar } from "./sidebar.js";
loadSideBar();

// ==============================
// STATE
// ==============================
const calendarGrid = document.querySelector(".calendar-grid");
const monthYearLabel = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

const projects = JSON.parse(localStorage.getItem("projectSave")) || [];

let currentDate = new Date(); // controls visible month

// ==============================
// HELPERS
// ==============================
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); // 0–6
}

function formatMonthYear(year, month) {
  return new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function isSameDate(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// ==============================
// RENDER CALENDAR
// ==============================
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Update header
  monthYearLabel.textContent = formatMonthYear(year, month);

  // Clear old days (keep weekday labels)
  calendarGrid.querySelectorAll(".day").forEach(day => day.remove());
  calendarGrid.querySelectorAll(".empty").forEach(e => e.remove());

  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  // Empty slots before day 1
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "empty";
    calendarGrid.appendChild(empty);
  }

  // Create day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = day;

    const cellDate = new Date(year, month, day);

    // Highlight today
    if (isSameDate(cellDate, new Date())) {
      cell.classList.add("today");
    }

    // Attach projects due on this date
    const dayProjects = projects.filter(p => {
      if (!p.endDate) return false;
      const projectDate = new Date(p.endDate);
      return isSameDate(projectDate, cellDate);
    });

    if (dayProjects.length > 0) {
      cell.classList.add("has-project");

      // Dot indicator
      const dot = document.createElement("span");
      dot.className = "project-dot";
      cell.appendChild(dot);
    }

    // Click → view projects for day
    cell.addEventListener("click", () => {
      if (dayProjects.length === 0) return;

      console.log("Projects due:", dayProjects);
      // Later: open modal / side panel here
    });

    calendarGrid.appendChild(cell);
  }
}

// ==============================
// NAVIGATION
// ==============================
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// ==============================
// INIT
// ==============================
renderCalendar();
