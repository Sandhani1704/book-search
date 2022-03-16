import { API_KEY, BOOKS_URL } from './utils';

//const url = `${this._baseUrl}/v1/volumes?q=${query}${categoryParam}&startIndex=${startIndex}&maxResults=${maxResult}&key=${this._apiKey}`;

export const getBooks = (keyword, category, startIndex, maxResult) => {
  const categoryParam = category === 'all'
    ? '' : `+subject:${category}`;
  // return fetch(`${BOOKS_URL}q=${keyword}&${API_KEY}`,
  return fetch(`${BOOKS_URL}q=${keyword}${categoryParam}&startIndex=${startIndex}&maxResults=${maxResult}&key=${API_KEY}`, {
  // return fetch(`${BOOKS_URL}q=${keyword}${categoryParam}&startIndex=${startIndex}&maxResults=${maxResult}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
}