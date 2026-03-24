import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  showLoader,
  createGallery,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query',
    });
    return;
  }
  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      if (!data?.hits?.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      e.target.reset();

      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
