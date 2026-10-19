'use strict';
const filterBar = document.querySelector('.filters');
const projects = [...document.querySelectorAll('.project')];
const count = document.querySelector('#project-count');
if (filterBar && count) {
  filterBar.hidden = false;
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const category = button.dataset.filter;
    filterBar.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    let visible = 0;
    projects.forEach((project) => {
      project.hidden = category !== 'all' && project.dataset.category !== category;
      if (!project.hidden) visible += 1;
    });
    count.textContent = String(visible).padStart(2, '0');
  });
}
// Direct links to individual projects also open their details.
function openLinkedProject() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  filterBar?.querySelector('[data-filter="all"]')?.click();
  project.open = true;
  project.scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', openLinkedProject);
openLinkedProject();
