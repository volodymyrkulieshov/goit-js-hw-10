import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_mw1wBFgWwKML3FhpuSEsISiVgwRZVBIhpdCjmemzslSsGbt2r1BAtVkT7YtRxOLe';

const elements = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { select, catInfo, loader, error } = elements;

select.addEventListener('change', handlerSelect);

function createCatList() {
  loader.classList.remove('is-hidden');
  select.classList.add('is-hidden');
  error.classList.add('is-hidden');

  fetchBreeds()
    .then(data => {
      const optionsList = data
        .map(({ id, name }) => `<option value="${id}">${name}</option>`)
        .join(' ');

      select.innerHTML = optionsList;

      new SlimSelect({
        select: select,
      });
      loader.classList.add('is-hidden');
      select.classList.remove('is-hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

createCatList();

function handlerSelect(evt) {
  loader.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');

  const selectedBreedId = evt.currentTarget.value;

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      renderMarkupInfo(data);
      loader.classList.add('is-hidden');
      catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      loader.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function renderMarkupInfo(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const beerdCard = `<img class="foto-cat" width = "300px" src="${url}" alt="${name}">
  <div class="text-part">
  <h2 class="name-cat">${name}</h2>
  <p class="deskr-cat">${description}</p>
  <p class="temperament-cat"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;

  catInfo.innerHTML = beerdCard;
}
