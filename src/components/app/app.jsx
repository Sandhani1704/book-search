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

  const onChangeCategories = (e) => {
    //setSortByDate(state.sorting === "relevance" ? false : true);

    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const onChangeSorting = (e) => {
    setSortByDate(!sortByDate);
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
    if (!keyword) {
      setSearchErrorMessage("Нужно ввести ключевое слово");
      return;
    }
    handleSearchBooks(keyword, state, startIndex, maxResult);
    setSearchErrorMessage("");
  }

  return (
    <div className="app">
      <div className="header-image">
        <Header />
        <SearchForm
          handleSearchBooks={handleSearchBooks}
          foundBooks={foundBooks}
          onChangeCategories={onChangeCategories}
          onChangeSorting={onChangeSorting}
          categories={state.categories}
          sorting={state.sorting}
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
          sortByDate={sortByDate}
        />
        {preloader && <Preloader />}
        {serverError && <ServerError />}
        {notFound && <NotFound />}
      </div>
    </div>
  );
}

export default App;
