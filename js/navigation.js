export async function loadNavigation() {
  const res = await fetch("../html/navigation.html");
  const html = await res.text();
  document.getElementById("navigation-container").innerHTML = html;

  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      if (btn.tagName === "A") {
        event.preventDefault();
      }

      const page = btn.getAttribute("data-page");

      if (page === "shoppingcart.html") {
        window.location.href = "../html/shoppingcart.html";
        return;
      }

      const isSearch = btn.id === "search-btn";
      const searchInput = isSearch
        ? document.getElementById("search-bar").value.toLowerCase().trim()
        : null;

      const pageRes = await fetch("../html/" + page);
      const pageHtml = await pageRes.text();
      document.getElementById("content-container").innerHTML = pageHtml;

      if (page === "results.html") {
        const module = await import("../js/results.js");
        module.loadResults(searchInput);
      }
    });
  });
}
