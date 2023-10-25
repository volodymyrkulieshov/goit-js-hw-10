// ----------------USE AXIOS--------------------
import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}
// --------------------------------------------------
// --------------------------------------------------
// -------------------------------------------------
// const BASE_URL = 'https://api.thecatapi.com/v1';
// const API_KEY =
//   'live_mw1wBFgWwKML3FhpuSEsISiVgwRZVBIhpdCjmemzslSsGbt2r1BAtVkT7YtRxOLe';

// export function fetchBreeds() {
//   return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   return fetch(
//     `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
