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
const PER_PAGE = 15;

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

    if (!data?.hits?.length) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits);
    const totalPages = Math.ceil(data.totalHits / PER_PAGE);

    const isLastPage = currentPage === totalPages;
    if (isLastPage) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
      });
    } else {
      showLoadMoreButton();
    }
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
if (refs.loadMore) {
  refs.loadMore.addEventListener('click', async e => {
    e.preventDefault();

    showLoader();
    hideLoadMoreButton();

    try {
      const data = await getImagesByQuery(currentQuery, currentPage);
      if (!data?.hits?.length) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results",
        });
        return;
      }
      appendGallery(data.hits);
      const totalPages = Math.ceil(data.totalHits / PER_PAGE);

      currentPage += 1;
      if (currentPage > totalPages) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results",
        });
        return;
      } else {
        showLoadMoreButton();
      }

      //scroll
      const card = document.querySelector('.gallery-item');
      if (!card) return;
      const height = card.getBoundingClientRect().height;

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    } catch (error) {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      hideLoader();
    }
  });
}
