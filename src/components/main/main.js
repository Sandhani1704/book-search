import React from 'react';
import './main.css';
import BookCard from '../book-card/book-card';
import BookCardList from '../book-card-list/book-card-list';
import Preloader from "../preloader/preloader";
import { useSelector, useDispatch } from "react-redux";
import { SORT_BOOKS, SHOW_BOOK_PAGE_INFO } from "../../services/actions/books";

function Main({ showButton, handleShowButtonClick }) {
  const dispatch = useDispatch();
  const { totalFoundBooks, foundBooks, loadMoreBooksRequest, sortedBooks, sortByDate } = useSelector((store) => store.books);

  // Сортировка книг по дате;
  React.useEffect(() => {

    function sort() {
      if (foundBooks?.length === 0) return;
      if (!sortByDate) {
        dispatch({ type: SORT_BOOKS, payload: foundBooks });
      } else {
        let booksToSort = [...foundBooks];
        booksToSort.sort((book1, book2) => {
          return book2.volumeInfo.publishedDate?.localeCompare(
            book1.volumeInfo.publishedDate
          );
        });
        dispatch({ type: SORT_BOOKS, payload: booksToSort });
      }
    }

    sort();
  }, [dispatch, sortByDate, foundBooks]);

  const onBookClick = (BookInfo) => {
    dispatch({ type: SHOW_BOOK_PAGE_INFO, BookInfo });
  };

  return (
    <main className={`main ${foundBooks?.length > 0 ? '' : 'main_none'}`}>
      <h1 className='main__title'>{`Found ${totalFoundBooks} results`}</h1>
      <BookCardList >
        {sortedBooks?.map((book, key) => (
          <BookCard
            book={book}
            key={key}
            sortedBooks={sortedBooks}
            onBookClick={onBookClick}
          />
        ))
        }
      </BookCardList>
      {loadMoreBooksRequest && <Preloader />}
      {showButton && <button className='main__showmore-button' onClick={handleShowButtonClick}>Load more</button>}

    </main>
  )
}

export default Main;