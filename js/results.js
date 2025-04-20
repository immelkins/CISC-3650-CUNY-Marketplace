import Model from './list.js';

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

  container.innerHTML = `
    <table id="results-table" class='table table-hover'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Year</th>
          <th>Seller</th>
          <th>Rating</th>
          <th>Resell Price</th>
        </tr>
      </thead>
      <tbody id='result-table-body'></tbody>
    </table>
  `;

  document.getElementById('load-more-btn').addEventListener('click', displayResults);
}

function displayResults() {
  const resultsTable = document.getElementById('result-table-body');
  const batch = activeResults.slice(currentIndex, currentIndex + 25);

  if (batch.length === 0 && currentIndex === 0) {
    resultsTable.innerHTML = `
      <tr><td colspan="6" class="text-center">
        <img src="image/not_found.gif" alt="Not Found" width="300" />
        <p>0 results found :(</p>
      </td></tr>
    `;
    document.getElementById('load-more-btn').style.display = 'none';
    return;
  }

  batch.forEach(result => {
    const row = `
      <tr>
        <td>${result.title}</td>
        <td>${result.contributor.join(', ')}</td>
        <td>${result.date}</td>
        <td>${result.seller}</td>
        <td>${result.rating}</td>
        <td>$${result.resell_price}</td>
      </tr>
    `;
    resultsTable.innerHTML += row;
  });

  currentIndex += 25;
  if (currentIndex >= activeResults.length) 
    {document.getElementById('load-more-btn').style.display = 'none';}
}
