import {
  GET_BOOKS_FAILED,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  LOAD_MORE_BOOKS_REQUEST,
  LOAD_MORE_BOOKS_SUCCESS,
  LOAD_MORE_BOOKS_FAILED,
  SET_KEYWORD,
  CHANGE_SORT_BY_DATE,
  SORT_BOOKS,
  SHOW_BOOK_PAGE_INFO,
} from "../actions/books";

export const initialState = {
  foundBooks: [],
  booksRequest: false,
  loadMoreBooksRequest: false,
  booksFailed: false,
  totalFoundBooks: "",
  keyword: "",
  sortedBooks: [],
  sortByDate: false,
  selectedBook: null,
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST: {
      return {
        ...state,
        booksRequest: true,
      };
    }
    case GET_BOOKS_SUCCESS: {
      return {
        ...state,
        booksFailed: false,
        foundBooks: action.books,
        totalFoundBooks: action.totalItems,
        booksRequest: false,
      };
    }
    case GET_BOOKS_FAILED: {
      return { ...state, booksFailed: true, booksRequest: false };
    }
    case LOAD_MORE_BOOKS_REQUEST: {
      return {
        ...state,
        loadMoreBooksRequest: true,
      };
    }
    case LOAD_MORE_BOOKS_SUCCESS: {
      return {
        ...state,
        booksFailed: false,
        foundBooks: [...state.foundBooks, ...action.newBooks],
        totalFoundBooks: action.totalItems,
        loadMoreBooksRequest: false,
      };
    }
    case SET_KEYWORD: {
      return {
        ...state,
        keyword: action.payload,
      };
    }
    case LOAD_MORE_BOOKS_FAILED: {
      return { ...state, booksFailed: true, loadMoreBooksRequest: false };
    }
    case CHANGE_SORT_BY_DATE: {
      return { ...state, sortByDate: action.payload };
    }
    case SORT_BOOKS: {
      return {
        ...state,
        sortedBooks: action.payload
      };
    }
    case SHOW_BOOK_PAGE_INFO: {
      return {
        ...state, selectedBook: action.BookInfo
      }
    }

    default: {
      return state;
    }
  }
};
