export function loadSideBar()
{
  fetch("../sidebar.html")
  .then(res => res.text())
  .then(html => {
    document.querySelector('.sidebar').innerHTML = html;
  });
}
