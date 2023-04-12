import { searchArtworks, fetchArtworkDetails } from './query.js';

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('search-term').value;
    
    if (searchTerm.trim() === '') {
        // Display an error message if the search term is empty
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = 'Please enter a keyword';
        errorDiv.style.display = 'block';
    } else {
        // Hide the error message if it was previously displayed
        const errorDiv = document.getElementById('error-message');
        errorDiv.style.display = 'none';

        const results = await searchArtworks(searchTerm);
        displayResults(results);
    }
});


  


async function displayResults(results) {
const tableBody = document.querySelector('#results tbody');
tableBody.innerHTML = '';

for (const objectID of results) {
    const artwork = await fetchArtworkDetails(objectID);

    if (!artwork) {
    continue;
    }

    const row = document.createElement('tr');

    const objectIdCell = document.createElement('td');
    objectIdCell.textContent = artwork.objectID;
    row.appendChild(objectIdCell);

    const titleCell = document.createElement('td');
    titleCell.textContent = artwork.title;
    row.appendChild(titleCell);

    const artistCell = document.createElement('td');
    artistCell.textContent = artwork.artistDisplayName || 'Unknown';
    row.appendChild(artistCell);

    tableBody.appendChild(row);
}
}
