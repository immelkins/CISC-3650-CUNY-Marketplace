// Load the navigation HTML into section
fetch('../html/navigation.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navigation-section').innerHTML = html;

    // After navigation is loaded attach listeners
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.getAttribute('data-page');
        fetch('../html/' + page)
          .then(res => res.text())
          .then(html => {
            document.getElementById('content-section').innerHTML = html;
          });
      });
    });
});

// Load the default page (homepage)
fetch('../html/homepage.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('content-section').innerHTML = html;
});