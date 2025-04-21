import Model from "./updatedList.js";
import { loadNavigation } from "./navigation.js";

const model = new Model();

const BOOKS_PER_ROW = 3;

const getRandomNumber = (max = 500) => {
  return Math.floor(Math.random() * (max + 1));
};

const getRandomItems = (list, count = 10) => {
  const result = [];
  const listCopy = [...list];
  const listLength = listCopy.length;

  if (count >= listLength) {
    return listCopy.sort(() => 0.5 - Math.random());
  }

  for (let i = 0; i < count; i++) {
    if (listCopy.length === 0) break;

    const randomIndex = getRandomNumber(listCopy.length - 1);

    const item = listCopy.splice(randomIndex, 1)[0];
    result.push(item);
  }

  return result;
};

const createBookCard = (item) => {
  return `
   <div class="book-card" data-id="${item.id}" tabindex="0">
     <img
       src="${item.image_url[0]}"
       alt="${item.title}"
       class="book-img"
       onerror="this.onerror=null; this.src='../image/not_found.gif';"
     />
     <div class="book-info">
       <h4 class="book-title">${item.title}</h4>
       <p class="book-author">${
         item.contributor ? item.contributor.join(", ") : "Unknown"
       }</p>
       <p class="book-meta">Published: ${item.date || "N/A"}</p>
       <p class="book-meta">Rating: ${item.rating || "0"} ★</p>
       <p class="book-meta">Seller: <strong>${item.seller || "N/A"}</strong></p>
       <p class="book-price">$${(item.resell_price || 0).toFixed(2)}</p>
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

const loadHomepageBooks = () => {
  const contentContainer = document.querySelector(".content-container");
  contentContainer.innerHTML = "";

  const recommendedSection = document.createElement("div");
  recommendedSection.classList.add("books-section");

  const recommendedTitle = document.createElement("h3");
  recommendedTitle.classList.add("section-title");
  recommendedTitle.textContent = "Recommended For You";
  recommendedSection.appendChild(recommendedTitle);

  const allItems = model.getAll();
  const randomBooks = getRandomItems(allItems, 6);

  const bookRows = splitIntoRows(randomBooks, BOOKS_PER_ROW);

  bookRows.forEach((row, rowIndex) => {
    const booksRow = document.createElement("div");
    booksRow.classList.add("books-row");

    row.forEach((book, bookIndex) => {
      const bookCard = createBookCard(book);
      const bookWrapper = document.createElement("div");
      bookWrapper.innerHTML = bookCard;
      const actualCard = bookWrapper.firstElementChild;

      actualCard.style.animationDelay = `${rowIndex * 0.2 + bookIndex * 0.1}s`;

      booksRow.appendChild(actualCard);
    });

    recommendedSection.appendChild(booksRow);
  });

  contentContainer.appendChild(recommendedSection);

  const trendingSection = document.createElement("div");
  trendingSection.classList.add("books-section");
  trendingSection.style.marginTop = "40px";

  const trendingTitle = document.createElement("h3");
  trendingTitle.classList.add("section-title");
  trendingTitle.textContent = "Trending Now";
  trendingSection.appendChild(trendingTitle);

  const trendingBooks = getRandomItems(allItems, 3);
  const trendingRow = document.createElement("div");
  trendingRow.classList.add("books-row");

  trendingBooks.forEach((book, index) => {
    const bookCard = createBookCard(book);
    const bookWrapper = document.createElement("div");
    bookWrapper.innerHTML = bookCard;
    const actualCard = bookWrapper.firstElementChild;

    actualCard.style.animationDelay = `${0.7 + index * 0.1}s`;

    trendingRow.appendChild(actualCard);
  });

  trendingSection.appendChild(trendingRow);
  contentContainer.appendChild(trendingSection);

  document.querySelectorAll(".book-card").forEach((card) => {
    card.addEventListener("click", () => {
      const bookId = card.dataset.id;
      console.log(`Book clicked: ${bookId}`);
      // navigate to book details page
    });
  });
};

const initHomepage = async () => {
  await loadNavigation();

  loadHomepageBooks();
};

document.addEventListener("DOMContentLoaded", initHomepage);
