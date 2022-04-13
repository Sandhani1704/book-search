import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import './book-page.css';

function BookPage() {
    const { sortedBooks, selectedBook } = useSelector((store) => store.books);
    const history = useHistory();
    const { id } = useParams();

    const selectedBookInfo = selectedBook
    ? selectedBook
    :  sortedBooks.find((item) => item.id === id);
    
    if (!sortedBooks.length) return null;

    if (!selectedBookInfo) {
        return <Redirect to="/notfound" />;
      }
    return (
        <div className="card">
            <div className="card__container">
                <img className="card__pic" src={selectedBookInfo.volumeInfo.imageLinks ? selectedBookInfo.volumeInfo.imageLinks.thumbnail : ''} alt='' />
                <div className="card__details">
                    <p className="card__categories">{selectedBookInfo.volumeInfo.categories}</p>
                    <h3 className="card__title">{selectedBookInfo.volumeInfo.title}</h3>
                    <h4 className="card__subtitle">{selectedBookInfo.volumeInfo.subtitle}</h4>
                    <p className="card__authors">{selectedBookInfo.volumeInfo.authors}</p>
                    <p className="card__description">{selectedBookInfo.volumeInfo.description}</p>
                </div>
            </div>
            <button className="button button_type_back" onClick={() => history.go(-1)}></button>
        </div>
    );
}

export default BookPage;