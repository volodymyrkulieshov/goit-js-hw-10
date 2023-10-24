// import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_mw1wBFgWwKML3FhpuSEsISiVgwRZVBIhpdCjmemzslSsGbt2r1BAtVkT7YtRxOLe';

// axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
    // console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
fetchBreeds();

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
fetchCatByBreed();
