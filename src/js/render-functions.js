import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});

export function createGallery(images) {
  const markup = images
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
              <p class="wrapper-list"><b>likes</b>${likes}</p>
              <p class="wrapper-list"><b>views</b>${views}</p>
              <p class="wrapper-list"><b>comments</b>${comments}</p>
              <p class="wrapper-list"><b>downloads</b>${downloads}</p>
            </div>
          </li>`
    )
    .join('');
  refs.gallery.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}
export function showLoader() {
  refs.loader.classList.add('visible');
}
export function hideLoader() {
  refs.loader.classList.remove('visible');
}
