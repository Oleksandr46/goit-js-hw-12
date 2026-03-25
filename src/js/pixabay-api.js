import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '55068901-115bb3486aee025ccc29fb7ad';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: page,
    },
  });
  return response.data;
}
