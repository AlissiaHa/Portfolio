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

// Reveal the contact only after a visitor activates the button.
const revealEmail = document.querySelector('#reveal-email');
const emailAddress = document.querySelector('#email-address');
if (revealEmail && emailAddress) {
  revealEmail.hidden = false;
  revealEmail.addEventListener('click', () => {
    const address = String.fromCharCode(97,108,105,115,115,105,97,46,104,97,108,100,101,109,97,110,110,64,104,111,116,109,97,105,108,46,99,111,109);
    const link = document.createElement('a');
    link.href = 'mailto:' + address;
    link.textContent = address;
    emailAddress.replaceChildren(link);
    revealEmail.hidden = true;
    link.focus();
  }, { once: true });
}
