import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  showLoader,
  createGallery,
  hideLoader,
  appendGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

const refs = {
  form: document.querySelector('.form'),
  loadMore: document.querySelector('.load-more'),
};
let currentQuery = '';
let currentPage = 1;

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query',
    });
    return;
  }
  currentQuery = query;
  currentPage = 1;

  clearGallery();
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
    if (!data?.hits?.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
    currentPage += 1;
    e.target.reset();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
});
refs.loadMore.addEventListener('click', async e => {
  e.preventDefault();

  showLoader();
  hideLoadMoreButton();

  const data = await getImagesByQuery(currentQuery, currentPage);
  appendGallery(data.hits);

  const totalPages = Math.ceil(data.totalHits / 15);
  if (currentPage < totalPages) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
  }
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results",
  });

  currentPage += 1;
});
