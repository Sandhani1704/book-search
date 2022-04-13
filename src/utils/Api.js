import { API_KEY, BOOKS_URL } from './utils';

export const getBooks = (keyword, category, startIndex, maxResult) => {
  const categoryParam = category === 'all'
    ? '' : `+subject:${category}`;
  return fetch(`${BOOKS_URL}q=${keyword}${categoryParam}&startIndex=${startIndex}&maxResults=${maxResult}&key=${API_KEY}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
    },
  }).then((res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  });
}
