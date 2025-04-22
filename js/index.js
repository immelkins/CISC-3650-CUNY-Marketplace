import { loadNavigation } from './navigation.js';
import { initHomepage } from './homepage.js';

// Load homepage content
const loadHomepage = () => {
  fetch('../html/homepage.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('content-container').innerHTML = html;
      initHomepage();
    });
};

// Load navigation and set up logo click once it’s in the DOM
loadNavigation().then(() => {
  const logo = document.querySelector('.brand-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      loadHomepage();
    });
  }
});

loadHomepage();
