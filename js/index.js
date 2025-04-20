import { loadNavigation } from './navigation.js';

// Load the navigation bar
loadNavigation();

// Load the default page (homepage)
fetch('../html/homepage.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('content-container').innerHTML = html;
  });
