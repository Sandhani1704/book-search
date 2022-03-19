import React from 'react';
import './main.css';
import BookCard from '../book-card/book-card';
import BookCardList from '../book-card-list/book-card-list';

function Main({ foundBooks, showButton, handleShowButtonClick, totalFoundBooks, sortByDate }) {
    const [sortedBooks, setSortedBooks] = React.useState([]);

    // Сортировка книг по дате;
  React.useEffect(() => {
    
    function sort() {
      if (foundBooks?.length === 0) return;
      if (!sortByDate) {
        setSortedBooks(foundBooks);
      } else {
        let booksToSort = [...foundBooks];
        booksToSort.sort((book1, book2) => {
          return book2.volumeInfo.publishedDate?.localeCompare(
            book1.volumeInfo.publishedDate
          );
        });
        setSortedBooks(booksToSort);
      }
    }

    sort();
  }, [sortByDate, foundBooks]);

    return (
        <main className={`main ${foundBooks?.length > 0 ? '' : 'main_none'}`}>
            <h1 className='main__title'>{`Found ${totalFoundBooks} results`}</h1>
            <BookCardList >
                {sortedBooks?.map((book, key) => (
                    <BookCard
                        book={book}
                        key={key}
                    />
                ))
                }
            </BookCardList>
            {showButton && <button className='main__showmore-button' onClick={handleShowButtonClick}>Load more</button>}

        </main>
    )
}

export default Main;