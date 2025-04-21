import Model from './updatedlist.js';

let currentIndex = 0;
let allResults = [];
let activeResults = [];

export function loadResults(searchInput = null) {
  const model = new Model();
  allResults = model.data.results;
  currentIndex = 0;

  if (searchInput) {
    activeResults = allResults.filter(result =>
      result.title.toLowerCase().includes(searchInput) ||
      result.tags.toLowerCase().includes(searchInput) ||
      result.contributor.join(', ').toLowerCase().includes(searchInput) ||
      result.seller.toLowerCase().includes(searchInput)
    );
  } 
  else {activeResults = allResults;}

  initialTable();
  displayResults();
}

function initialTable() {
  const container = document.getElementById('results-container');
  container.innerHTML = ''; // Clear any previous content
  document.getElementById('load-more-btn').addEventListener('click', displayResults);
}


function displayResults() {
  const container = document.getElementById('results-container');
  const batch = activeResults.slice(currentIndex, currentIndex + 25);

  if (batch.length === 0 && currentIndex === 0) {
    container.innerHTML = `
      <div class="not-found">
        <img src="image/not_found.gif" alt="Not Found" width="300" />
        <p>0 results found :(</p>
      </div>
    `;
    document.getElementById('load-more-btn').style.display = 'none';
    return;
  }

  batch.forEach(result => {
    const imageSrc = result.image_url?.[0] || 'image/placeholder.png';
    
    const card = `
      <div class="result-card">
        <div class="thumbnail">
          <img src="${imageSrc}" alt="Cover for ${result.title}" />
        </div>
        <div class="info">
          <div class="title-rating">
            <h3>${result.title}</h3>
            <div class="tags">tags: ${result.tags}</div>
            <div class="stars">${'★'.repeat(Math.round(result.rating || 0))}</div>
          </div>
          <p>${result.description?.[0] || 'No description available.'}</p>
          <div class="seller">seller: ${result.seller}</div>
          <div class="price">price: $${result.resell_price}</div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
  
  currentIndex += 25;
  if (currentIndex >= activeResults.length) {
    document.getElementById('load-more-btn').style.display = 'none';
  }
}
