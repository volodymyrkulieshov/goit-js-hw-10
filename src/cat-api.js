const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_mw1wBFgWwKML3FhpuSEsISiVgwRZVBIhpdCjmemzslSsGbt2r1BAtVkT7YtRxOLe';

export function fetchBreeds() {
  return fetch(`${URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// ----------------USE AXIOS--------------------

// export function fetchBreeds() {
//   return axios.get(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
//     console.log(response);
//     if (response.status !== 200) {
//       throw new Error(response.status);
//     }
//     return response;
//   });
// }
// fetchBreeds();

// export function fetchCatByBreed(breedId) {
//   return axios
//     .get(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
//     .then(response => {
//       console.log(response);
//       if (response.status !== 200) {
//         throw new Error(response.status);
//       }
//       return response;
//     });
// }
// fetchCatByBreed();
