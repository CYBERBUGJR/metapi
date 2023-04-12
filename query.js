// Api Constants
const apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1'
const srchUrl = apiUrl + '/search';
const objUrl = apiUrl + '/objects';

let lastQueryTime = 0
// searchArtworks returns an array of ObjectIDs with keyword is found by the API else none.
export async function searchArtworks(searchTerm) {
 
  const queryParams = new URLSearchParams({
    q: searchTerm,
    isHighlight: false,
    hasImages: true
  });

  const currentTime = Date.now();


  const timeSinceLastQuery = currentTime - lastQueryTime;
  // Rate limit to max 80 queries/seconds, time is given in milliseconds, so complex maths goes on => 1000/80 = 12.5 ms
  const delay = 12.5 - timeSinceLastQuery; 

  return new Promise((resolve) => {
    setTimeout(async () => {
      lastQueryTime = Date.now();

      try {
        const response = await fetch(`${srchUrl}?${queryParams}`);
        if (!response.ok) {
          console.error(`Request failed with status code ${response.status}`);
          return [];
        }
        const data = await response.json();

        if (data && data.objectIDs) {
          console.log(data.objectIDs);
          resolve(data.objectIDs);
        } else {
          console.error('No results found');
          resolve([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        resolve([]);
      }
    }, Math.max(delay, 0));
  });
}


export async function fetchArtworkDetails(objectID) {
  try {
    const response = await fetch(`${objUrl}/${objectID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artwork details:', error);
    return null;
  }
}

// Rate limit to max 80 queries/seconds, time is given in milliseconds, so complex maths goes on => 1000/80 = 12.5 ms
function rateLimiter(callback, delay) {
  let lastQueryTime = 0;

  return async function (...args) {
    const currentTime = Date.now();
    const timeSinceLastQuery = currentTime - lastQueryTime;
    const waitTime = delay - timeSinceLastQuery;

    return new Promise((resolve) => {
      setTimeout(async () => {
        lastQueryTime = Date.now();
        const result = await callback(...args);
        resolve(result);
      }, Math.max(waitTime, 0));
    });
  };
}