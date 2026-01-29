export function loadSideBar()
{
  fetch("../HTML/sidebar.html")
  .then(res => res.text())
  .then(html => {
    document.querySelector('.sidebar').innerHTML = html;
  });
}
