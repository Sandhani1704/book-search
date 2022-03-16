import React from 'react';
import './main.css';
import BookCard from '../book-card/book-card';
import BookCardList from '../book-card-list/book-card-list';

function Main({ foundBooks, showButton, handleShowButtonClick, totalFoundBooks }) {



    return (
        <main className={`main ${foundBooks?.length > 0 ? '' : 'main_none'}`}>
            <h1 className='main__title'>{`Found ${totalFoundBooks} results`}</h1>
            <BookCardList >
                {foundBooks?.map((book, key) => (
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