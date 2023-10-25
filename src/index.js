import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elements = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

elements.catInfo.classList.add('is-hidden');

elements.select.addEventListener('change', createMarkup);

updateSelect();

function updateSelect(data) {
  fetchBreeds(data)
    .then(data => {
      elements.loader.classList.replace('loader', 'is-hidden');

      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      elements.select.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select,
      });
    })
    .catch(onFetchError);
}

function createMarkup(event) {
  elements.loader.classList.replace('is-hidden', 'loader');
  elements.select.classList.add('is-hidden');
  elements.catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      elements.loader.classList.replace('loader', 'is-hidden');
      elements.select.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      elements.catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
            <div class="box">
            <h2>${breeds[0].name}</h2>
            <p>${breeds[0].description}</p>
            <p><strong>Temperament:</strong> ${breeds[0].temperament}</p>
            </div>`;
      elements.catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError() {
  elements.select.classList.remove('is-hidden');
  elements.loader.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
