import React from "react";
import "./book-card.css";

function BookCard({book}) {
  return (
    <div className="book-card">
      <div className="book-card__content-container">
        <div className="book-card__image-container">
            {/* <a
            href=''
            target="_blank"
            rel="noopener noreferrer"
            className="book-card__source-link"
          > */}
            
        <img className="book-card__image" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''} alt={book.volumeInfo.title} />
          {/* </a> */}
        </div>
        <p className="book-card__description">{book.volumeInfo.categories && book.volumeInfo.categories[0] }</p>
        <h3 className="book-card__title">{book.volumeInfo.title}</h3>
        
      </div>

      <p className="book-card__source">{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}</p>
    </div>
  );
}

export default BookCard;
