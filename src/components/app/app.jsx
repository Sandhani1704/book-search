import "./app.css";
import React from "react";
import Header from "../header/header";
import SearchForm from "../search-form/search-form";
import Main from "../main/main";
import Preloader from "../preloader/preloader";
import ServerError from "../server-error/server-error";
import NotFound from "../not-found/not-found";
import * as books from "../../utils/Api";

function App() {
  const [preloader, setPreloader] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [foundBooks, setFoundBooks] = React.useState([]);
  const [totalFoundBooks, setTotalFoundBooks] = React.useState("");
  const [state, setState] = React.useState({
    categories: "all",
    sorting: "relevance",
  });
  const [startIndex, setStartIndex] = React.useState(0);
  const [showButton, setShowButton] = React.useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = React.useState("");
  const [sortByDate, setSortByDate] = React.useState(false);
  const maxResult = 30;

  const onChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  console.log(state.categories);

  // обработчик поиска книг
  function handleSearchBooks(keyword, state, startIndex, maxResult) {
    setPreloader(true);
    setNotFound(false);
    setServerError(false);
    return books
      .getBooks(keyword, state, startIndex, maxResult)
      .then((data) => {
        console.log(data);

        setPreloader(false);
        setFoundBooks(data.items);
        setTotalFoundBooks(data.totalItems);
        //setKeyword(keyword);
        setNotFound(false);

        if (data.items.length === 0) {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError(true);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  console.log(foundBooks);

  //console.log(keyword);

  React.useEffect(() => {
    if (foundBooks?.length <= totalFoundBooks) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [foundBooks, totalFoundBooks]);

  function handleShowButtonClick(keyword) {
    const newStartIndex = startIndex + 1 * maxResult;
    setPreloader(true);
    books
      .getBooks(keyword, state.categories, newStartIndex, maxResult)
      .then((newBooks) => {
        console.log(newBooks);

        setPreloader(false);
        setFoundBooks([...foundBooks, ...newBooks.items]);
        setTotalFoundBooks(newBooks.totalItems);

        setStartIndex(newStartIndex);
      });
  }

  function handleSubmitKeyword(keyword, state, startIndex, maxResult) {
    // e.preventDefault();
    //setKeyword(keyword)
    if (!keyword) {
      setSearchErrorMessage("Нужно ввести ключевое слово");
      return;
    }
    handleSearchBooks(keyword, state, startIndex, maxResult);
    setSearchErrorMessage("");
  }

  // Сортировка книг по дате;
  React.useEffect(() => {
    setSortByDate(state.sorting === "relevance" ? false : true);

    function sort() {
      if (foundBooks?.length === 0) return;
      if (!sortByDate) {
        setFoundBooks(foundBooks);
      } else {
        let booksToSort = [...foundBooks];
        booksToSort.sort((book1, book2) => {
          return book2.volumeInfo.publishedDate?.localeCompare(
            book1.volumeInfo.publishedDate
          );
        });
        setFoundBooks(booksToSort);
      }
    }

    sort();
  }, [state.sorting, foundBooks, sortByDate]);

  return (
    <div className="app">
      <div className="header-image">
        <Header />
        <SearchForm
          handleSearchBooks={handleSearchBooks}
          foundBooks={foundBooks}
          onChange={onChange}
          state={state.categories}
          // handleChangeKeyword={handleChangeKeyword}
          startIndex={startIndex}
          maxResult={maxResult}
          searchErrorMessage={searchErrorMessage}
          handleSubmitKeyword={handleSubmitKeyword}
          sortByDate={sortByDate}
        />
        <Main
          foundBooks={foundBooks}
          handleShowButtonClick={handleShowButtonClick}
          showButton={showButton}
          totalFoundBooks={totalFoundBooks}
        />
        {preloader && <Preloader />}
        {serverError && <ServerError />}
        {notFound && <NotFound />}
      </div>
    </div>
  );
}

export default App;
