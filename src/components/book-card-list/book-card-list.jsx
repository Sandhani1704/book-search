import React from 'react';
import './book-card-list.css';

function BookCardList({ children }) {
    return (
        <div className='books-card-list'>
            {children}
        </div>
    );
}

export default BookCardList;