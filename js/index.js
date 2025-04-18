// Load the navigation HTML into section
fetch('../html/navigation.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navigation-sect').innerHTML = html;
});

fetch('../html/homepage.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('homepage-sect').innerHTML = html;
});