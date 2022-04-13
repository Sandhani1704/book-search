import { getBooks } from '../../utils/Api';

export const GET_BOOKS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_BOOKS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_BOOKS_FAILED = 'GET_ITEMS_FAILED';

export const LOAD_MORE_BOOKS_REQUEST = 'LOAD_MORE_BOOKS_REQUEST';
export const LOAD_MORE_BOOKS_SUCCESS = 'LOAD_MORE_BOOKS_SUCCESS';
export const LOAD_MORE_BOOKS_FAILED = 'LOAD_MORE_BOOKS_FAILED';
export const SET_KEYWORD = 'SET_KEYWORD';
export const SORT_BOOKS = 'SORT_BOOKS';
export const CHANGE_SORT_BY_DATE = 'CHANGE_SORT_BY_DATE';
export const SHOW_BOOK_PAGE_INFO = 'SHOW_BOOK_PAGE_INFO';

export const getFoundBooks = (keyword, category, startIndex, maxResult) => (dispatch) => {
  dispatch({ type: GET_BOOKS_REQUEST });
  getBooks(keyword, category, startIndex, maxResult)
    .then((res) => {
      if (res) {
        dispatch({ type: GET_BOOKS_SUCCESS, books: res.items, totalItems: res.totalItems })
        return;
      }
      return Promise.reject(res);
    })
    .catch((err) =>
      dispatch({
        type: GET_BOOKS_FAILED,
        message: `Ошибка получения данных: ${err.message}`,
      })
    );
};

export const loadMoreBooks = (keyword, category, newStartIndex, maxResult) => (dispatch) => {
  dispatch({ type: LOAD_MORE_BOOKS_REQUEST });
  getBooks(keyword, category, newStartIndex, maxResult)
    .then((res) => {
      if (res) {
        dispatch({ type: LOAD_MORE_BOOKS_SUCCESS, newBooks: res.items, totalItems: res.totalItems })
        return;
      }
      return Promise.reject(res);
    })
    .catch((err) =>
      dispatch({
        type: LOAD_MORE_BOOKS_FAILED,
        message: `Ошибка получения данных: ${err.message}`,
      })
    );
};