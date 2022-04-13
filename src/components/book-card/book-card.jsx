import React from "react";
import "./book-card.css";
import { Link, useLocation } from "react-router-dom";

function BookCard({ book, onBookClick }) {
  const location = useLocation();
  return (
    <Link
      to={{
        pathname: `/book/${book.id}`,
        state: { background: location },
      }}
      onClick={() => {
        onBookClick(book);
      }}
      className="book-card"
    >
      <div className="book-card__content-container">
        <div className="book-card__image-container">
          <img
            className="book-card__image"
            src={
              book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : ""
            }
            alt={book.volumeInfo.title}
          />
        </div>
        <p className="book-card__description">
          {book.volumeInfo.categories && book.volumeInfo.categories[0]}
        </p>
        <h3 className="book-card__title">{book.volumeInfo.title}</h3>
      </div>

      <p className="book-card__source">
        {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ""}
      </p>
    </Link>
  );
}

export default BookCard;
