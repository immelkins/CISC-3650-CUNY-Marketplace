import Model from "./updatedlist.js";
import CartModel from "./shopingcart.js";
let cartModel = new CartModel();

let currentIndex = 0;
let allResults = [];
let activeResults = [];
let copyResults = [];

export function loadResults(searchInput = null) {
  const model = new Model();
  allResults = model.data.results;
  currentIndex = 0;
  document
    .getElementById("clear-filters")
    .addEventListener("click", clearFilters);
  document
    .getElementById("apply-filters")
    .addEventListener("click", applyFilters);

  if (searchInput) {
    activeResults = allResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchInput) ||
        result.tags.toLowerCase().includes(searchInput) ||
        result.contributor.join(", ").toLowerCase().includes(searchInput) ||
        result.seller.toLowerCase().includes(searchInput)
    );
  } else {
    activeResults = allResults;
  }
  copyResults = activeResults;
  initialTable();
  displayResults();
}

function initialTable() {
  const container = document.getElementById("results-container");
  container.innerHTML = "";
  document
    .getElementById("load-more-btn")
    .addEventListener("click", displayResults);
}

function displayResults() {
  const container = document.getElementById("results-container");
  const batch = activeResults.slice(currentIndex, currentIndex + 20);

  if (batch.length === 0 && currentIndex === 0) {
    container.innerHTML = `
      <div class="not-found">
        <img src="image/not_found.gif" alt="Not Found" width="300" />
        <p>0 results found :(</p>
      </div>
    `;
    document.getElementById("load-more-btn").style.display = "none";
    return;
  }

  if (currentIndex === 0) {
    container.innerHTML = "<h2>Results</h2>";
  }
  batch.forEach((result) => {
    container.innerHTML += createCard(result);
  });

  container.addEventListener("click", (event) => {
    const card = event.target.closest(".result-card");
    if (card) {
      const id = card.getAttribute("data-id");
      showCardDetails(id);
    }
  });

  currentIndex += 20;
  if (currentIndex >= activeResults.length) {
    document.getElementById("load-more-btn").style.display = "none";
  }
}

function createCard(object) {
  const imageSrc = object.image_url?.[0] || "../image/placeholder.png";
  return `
    <div class="result-card" data-id="${
      object.itemID
    }" style="cursor: pointer;">
      <div class="thumbnail">
        <img src="${imageSrc}" alt="Cover for ${object.title}" />
      </div>
      <div class="info">
        <div class="title-rating">
          <h3>${object.title}</h3>
          <div class="tags">tags: ${object.tags}</div>
          <div class="stars">${"★".repeat(Math.round(object.rating || 0))}</div>
        </div>
        <p>${object.description?.[0] || "No description available."}</p>
        <div class="seller">seller: ${object.seller}</div>
        <div class="price">price: $${Number(object.resell_price).toFixed(
          2
        )}</div>     
      </div>
    </div>
  `;
}

function showCardDetails(id) {
  const itemDetails = allResults[id];
  const container = document.getElementById("results-container");
  container.innerHTML = "";
  document.getElementById("load-more-btn").style.display = "none";

  const imageSrc = itemDetails.image_url?.[0] || "../image/placeholder.png";
  container.innerHTML = `
    <div class="details-card">
      <div class="details-image">
        <img src="${imageSrc}" alt="Cover for ${itemDetails.title}" />
      </div>
      <div class="details-info">
        <div class="title-rating">
          <h2>${itemDetails.title}</h2>
          <div class="price">Price: $${Number(itemDetails.resell_price).toFixed(
            2
          )}</div>

          <div class="contributor">By: ${itemDetails.contributor.join(
            ", "
          )}</div>
          <div class="stars">${"★".repeat(
            Math.round(itemDetails.rating || 0)
          )} ${itemDetails.rating.toFixed(1)}</div>
          <div class="tags">Tags: ${itemDetails.tags}</div>
        </div>
        <div class="details-description">
          <p>${itemDetails.description?.[0] || "No description available."}</p>
        </div>
        <div class="details-meta">
          <div class="seller">Seller: ${itemDetails.seller}</div>
          <div class="year">Year: ${itemDetails.date}</div>
        </div>
        <div class="details-actions">
          <button class="back-btn">← Back to Results</button>
          <button class="cart-btn">Add to Cart</button>

        </div>
      </div>
    </div>
  `;
  container.querySelector(".back-btn").addEventListener("click", backResults);
  container.querySelector(".cart-btn").addEventListener("click", () => {
    addItemToCart(itemDetails);
  });
}

function backResults() {
  currentIndex = 0;
  activeResults = copyResults;
  const container = document.getElementById("results-container");
  container.innerHTML = "";
  displayResults();

  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      currentIndex < activeResults.length ? "block" : "none";
  }
  window.scrollTo(0, 0);
}

function applyFilters() {
  const selectedTags = Array.from(
    document.querySelectorAll('input[name="tag"]:checked')
  ).map((cb) => cb.value.toLowerCase());

  const minRating =
    parseFloat(document.getElementById("rating-filter")?.value) || 0;
  const minPrice = parseFloat(document.getElementById("min-price")?.value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("max-price")?.value) || Infinity;

  activeResults = allResults.filter((result) => {
    const tagMatch =
      selectedTags.length === 0 ||
      (result.tags &&
        selectedTags.some((tag) => result.tags.toLowerCase().includes(tag)));

    const ratingMatch = result.rating >= minRating;
    const priceMatch =
      result.resell_price >= minPrice && result.resell_price <= maxPrice;
    return tagMatch && ratingMatch && priceMatch;
  });

  copyResults = activeResults;
  currentIndex = 0;
  document.getElementById("results-container").innerHTML = "";
  displayResults();
  window.scrollTo(0, 0);
}

function clearFilters() {
  // Reset Filter section
  document
    .querySelectorAll('input[name="tag"]')
    .forEach((cb) => (cb.checked = false));
  document.getElementById("rating-filter").value = "0";
  document.getElementById("min-price").value = "0";
  document.getElementById("max-price").value = "100";

  // Reset data and view
  activeResults = allResults;
  copyResults = allResults;
  currentIndex = 0;
  document.getElementById("results-container").innerHTML = "";
  document.getElementById("load-more-btn").style.display = "block";
  displayResults();
  window.scrollTo(0, 0);
}

function addItemToCart(item) {
  cartModel.addToCart(item);
  alert(`${item.title} has been added to your cart!`);
}
