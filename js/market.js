import YourListModel from "./updatedyourlist.js";
import { searchListener } from './results.js';

searchListener();

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('clear-filters').addEventListener('click', clearFilters);
    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    const model = new YourListModel();
    const allItems = model.getAll();
    const LISTINGS_PER_ROW = 3;

    const createListingCard = (item) => {
        return `
   <div class="listing-card" data-id="${item.id}" tabindex="0">
     <img
       src="${item.image_url[0]}"
       alt="${item.title}"
       class="listing-img"
       onerror="this.onerror=null; this.src='../images/placeholder.png';"
     />
     <div class="listing-info">
       <h4 class="listing-title">${item.title}</h4>
       <p class="listing-author">${item.contributor ? item.contributor.join(", ") : "Unknown"
            }</p>
       <p class="listing-meta">Published: ${item.date || "N/A"}</p>
       <p class="listing-meta">Rating: ${item.rating || "0"} ★</p>
       <p class="listing-meta">Seller: <strong>${item.seller || "N/A"
            }</strong></p>
       <p class="listing-price">$${(item.resell_price || 0).toFixed(2)}</p>
     </div>
   </div>
 `;
    };

    const splitIntoRows = (items, perRow) => {
        const rows = [];
        for (let i = 0; i < items.length; i += perRow) {
            rows.push(items.slice(i, i + perRow));
        }
        return rows;
    };

    function loadListings(list) {
        const listingsContainer = document.getElementById("listings-container");
        listingsContainer.innerHTML = "";

        const listingRows = splitIntoRows(list, LISTINGS_PER_ROW);

        listingRows.forEach((row, rowIndex) => {
            const listingsRow = document.createElement("div");
            listingsRow.classList.add("listings-row");

            row.forEach((listing, listingIndex) => {
                const listingCard = createListingCard(listing);
                const listingWrapper = document.createElement("div");
                listingWrapper.innerHTML = listingCard;
                const actualCard = listingWrapper.firstElementChild;

                actualCard.style.animationDelay = `${rowIndex * 0.2 + listingIndex * 0.1}s`;
                listingsRow.appendChild(actualCard);
            });

            listingsContainer.appendChild(listingsRow);
        });
    }

    function applyFilters() {
        const selectedTags = Array.from(
            document.querySelectorAll('input[name="tag"]:checked')
        ).map(cb => cb.value.toLowerCase());

        const minRating = parseFloat(document.getElementById('rating-filter')?.value) || 0;
        const minPrice = parseFloat(document.getElementById('min-price')?.value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price')?.value) || Infinity;

        let activeResults = allItems.filter(result => {
            const tagMatch = selectedTags.length === 0 ||
                (result.tags && selectedTags.some(tag =>
                    result.tags.toLowerCase().includes(tag)
                ));

            const ratingMatch = result.rating >= minRating;
            const priceMatch = result.resell_price >= minPrice && result.resell_price <= maxPrice;
            return tagMatch && ratingMatch && priceMatch;
        });

        document.getElementById('listings-container').innerHTML = '';
        loadListings(activeResults);
        window.scrollTo(0, 0);
    }

    function clearFilters() {
        // Reset Filter section
        document.querySelectorAll('input[name="tag"]').forEach(cb => cb.checked = false);
        document.getElementById('rating-filter').value = '0';
        document.getElementById('min-price').value = '0';
        document.getElementById('max-price').value = '150';

        // Reset data and view
        document.getElementById('listings-container').innerHTML = '';
        loadListings(allItems);
        window.scrollTo(0, 0);
    }

    const initMarketpage = () => {
        loadListings(allItems);
    };
    initMarketpage();
});
