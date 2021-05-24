// removed children button (add) while building new API calls, etc. Add back once complete.

import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';
import addButton from '../images/add-button.png';
import BookListItem from './book-list-item';
import { ResultData, ShelfResultData } from './shared';
import { searchAPI, getShelvesAPI, bookAPI } from './api-calls';
import Modal from 'react-modal';

interface Props {
  book: string;
  bookTitle: string;
}

const SearchResults = () => {
  const [query, setQuery] = useState<ResultData | null | undefined>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [shelves, setShelves] = useState<ShelfResultData>();
  const [selectedShelf, setSelectedShelf] = useState<string>();
  const [bookID, setBookID] = useState<string>();

  const location = useLocation();
  const parseSearch = new URLSearchParams(location.search);
  const title = parseSearch.get('title');

  const getResults = async () => {
    const results = await searchAPI(title);
    setQuery(results);
  };

  const getShelfOptions = async () => {
    const shelves = await getShelvesAPI();
    setShelves(shelves);
  };

  useEffect(() => {
    getResults();
  }, [location]);

  useEffect(() => {
    getShelfOptions();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openAddBook = (book: string) => {
    setBookID(book);
    openModal();
    console.log(bookID);
  };

  const submitAddBook = async (shelfID: string | undefined) => {
    await bookAPI('PUT', bookID, shelfID);
    closeModal();
  };

  const totalResults = query?.total;
  const bookResults = query?.items || [];
  const mappedBooks = bookResults.map((bookResult) => (
    <BookListItem
      book={bookResult}
      key={bookResult.id}
      rightAccessory={
        <img
          id="add-delete-button"
          onClick={() => openAddBook(bookResult.id)}
          src={addButton}
          alt="add favorite button"
        />
      }
    />
  ));

  const shelfDetails = shelves?.items || [];
  const mappedShelfNames = shelfDetails.map((shelfDetail) => (
    <option
      className="shelf-option"
      key={shelfDetail.id}
      value={shelfDetail.id}
    >
      {shelfDetail.name}
    </option>
  ));

  return (
    <div className="component-book-list">
      <div className="component-box">
        <Link className="home-button" to="/">
          <span>Home</span>
        </Link>
        <div className="component-list-title" key={null}>
          <div className="component-title-text">
            <span className="list-title">Search Results</span>
            <span className="results-number">Results: {totalResults}</span>
          </div>
        </div>
        <div className="component-list-body">{mappedBooks}</div>
        <Modal
          className="Modal"
          overlayClassName="overlay"
          isOpen={modalIsOpen}
        >
          <form className="shelf-form">
            <select
              className="shelf-list-dropdown"
              onChange={(e) => setSelectedShelf(e.target.value)}
            >
              {mappedShelfNames}
            </select>
            <label className="list-label" htmlFor="list">
              Select a List
            </label>
            <div className="shelf-option-container">
              <input
                type="button"
                className="button-on-light"
                id="edit-button-modal"
                value="Add Book"
                onClick={() => submitAddBook(selectedShelf)}
              />
              <input
                type="button"
                className="button-on-light"
                id="edit-button-modal"
                value="Go Back"
                onClick={closeModal}
              />
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default SearchResults;
