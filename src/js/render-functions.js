import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader-wrapper'),
  loadMore: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

function createMarkup(images) {
  return images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a href="${largeImageURL}">
              <img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
            <div class="gallery-wrapper">
              <p class="wrapper-list"><b>likes:</b> ${likes}</p>
              <p class="wrapper-list"><b>views:</b> ${views}</p>
              <p class="wrapper-list"><b>comments:</b> ${comments}</p>
              <p class="wrapper-list"><b>downloads:</b> ${downloads}</p>
            </div>
          </li>`
    )
    .join('');
}
export function createGallery(images) {
  if (!refs.gallery) return;

  refs.gallery.innerHTML = createMarkup(images);
  lightbox.refresh();
}
export function appendGallery(images) {
  if (!refs.gallery) return;

  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(images));
  lightbox.refresh();
}
export function clearGallery() {
  if (!refs.gallery) return;
  refs.gallery.innerHTML = '';
}
export function showLoader() {
  if (!refs.loader) return;
  refs.loader.classList.add('visible');
}
export function hideLoader() {
  if (!refs.loader) return;
  refs.loader.classList.remove('visible');
}
export function showLoadMoreButton() {
  if (!refs.loadMore) return;
  refs.loadMore.classList.add('visible');
}
export function hideLoadMoreButton() {
  if (!refs.loadMore) return;
  refs.loadMore.classList.remove('visible');
}
