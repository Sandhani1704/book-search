import React from "react";
import "./search-form.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_KEYWORD } from "../../services/actions/books";

function SearchForm({
  onChangeCategories,
  onChangeSorting,
  categories,
  sorting,
  searchErrorMessage,
  handleSubmitKeyword,
  startIndex,
  maxResult,
}) {
  const dispatch = useDispatch();
  const { keyword } = useSelector((store) => store.books);

  function handleChangeKeyword(e) {
    dispatch({ type: SET_KEYWORD, payload: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmitKeyword(keyword, categories, startIndex, maxResult);
  }

  return (
    <div className="search-form__container">
      <form
        className="search-form"
        name="search-form"
        noValidate
        onSubmit={onSubmit}
      >
        <h1 className="search-form__title">Search for books</h1>
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            placeholder="Enter book title"
            name="search-text"
            value={keyword || ""}
            required
            onChange={handleChangeKeyword}
          />
          <span id="search-error" className="search__input-error">
            {searchErrorMessage}
          </span>
          <button type="submit" className="search-form__button-find">
            Search
          </button>
        </div>
      </form>
      <div className="filter-container">
        <div className="field">
          <label className="label">Categories</label>
          <select
            className="select"
            name="categories"
            value={categories}
            onChange={onChangeCategories}
          >
            <option value="all">all</option>
            <option value="Art">art</option>
            <option value="Biography">biography</option>
            <option value="Computers">computers</option>
            <option value="History">history</option>
            <option value="Medicine">medicine</option>
            <option value="Poetry">poetry</option>
          </select>
        </div>
        <div className="field">
          <label className="label">Sorting by</label>
          <select
            className="select"
            name="sorting"
            value={sorting}
            onChange={onChangeSorting}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
