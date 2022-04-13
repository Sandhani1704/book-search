import "./app.css";
import React from "react";
import Header from "../header/header";
import SearchForm from "../search-form/search-form";
import Main from "../main/main";
import ServerError from "../server-error/server-error";
import NotFound from "../not-found/not-found";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import BookPage from "../../pages/book-page/book-page";
import Preloader from "../preloader/preloader";
import { useDispatch, useSelector } from "react-redux";
import {
  getFoundBooks,
  loadMoreBooks,
  CHANGE_SORT_BY_DATE,
} from "../../services/actions/books";

function App() {
  const location = useLocation();
  const history = useHistory();
  const [notFound, setNotFound] = React.useState(false);
  const [state, setState] = React.useState({
    categories: "all",
    sorting: "relevance",
  });
  const [startIndex, setStartIndex] = React.useState(0);
  const [showButton, setShowButton] = React.useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = React.useState("");
  const maxResult = 30;
  const dispatch = useDispatch();
  const {
    foundBooks,
    booksRequest,
    booksFailed,
    totalFoundBooks,
    keyword,
    sortByDate,
  } = useSelector((store) => store.books);

  const onChangeCategories = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const onChangeSorting = (e) => {
    dispatch({ type: CHANGE_SORT_BY_DATE, payload: !sortByDate });
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  React.useEffect(() => {
    if (foundBooks.length === 0) {
      setNotFound(true);
    }
  }, [foundBooks]);

  React.useEffect(() => {
    if (foundBooks?.length <= totalFoundBooks) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [foundBooks, totalFoundBooks]);

  function handleShowButtonClick() {
    const newStartIndex = startIndex + 1 * maxResult;
    dispatch(
      loadMoreBooks(keyword, state.categories, newStartIndex, maxResult)
    );
    setStartIndex(newStartIndex);
  }

  // обработчик поиска книг
  function handleSubmitKeyword(keyword, state, startIndex, maxResult) {
    localStorage.removeItem("booksItems");
    if (!keyword) {
      setSearchErrorMessage("Нужно ввести ключевое слово");
      return;
    }
    if (location.pathname !== "/") {
      history.push("/");
    }
    dispatch(getFoundBooks(keyword, state, startIndex, maxResult));
    setSearchErrorMessage("");
  }

  React.useEffect(() => {
    if (location.pathname !== "/") {
      history.push("/");
    }
  }, []);

  return (
    <div className="app">
      <div className="header-image">
        <Header />
        <SearchForm
          onChangeCategories={onChangeCategories}
          onChangeSorting={onChangeSorting}
          categories={state.categories}
          sorting={state.sorting}
          startIndex={startIndex}
          maxResult={maxResult}
          searchErrorMessage={searchErrorMessage}
          handleSubmitKeyword={handleSubmitKeyword}
        />
      </div>
      <Switch>
        <Route exact path="/">
          {!booksRequest ? (
            <Main
              handleShowButtonClick={handleShowButtonClick}
              showButton={showButton}
              sortByDate={sortByDate}
            />
          ) : (
            Preloader
          )}
        </Route>
        <Route exact path="/book/:id">
          <BookPage />
        </Route>
        {booksFailed && <ServerError />}
        {notFound && <NotFound />}
      </Switch>
    </div>
  );
}

export default App;
