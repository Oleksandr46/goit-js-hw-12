import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: '55068901-115bb3486aee025ccc29fb7ad',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
