import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';
import addButton from '../images/add-button.png';
import BookListItem from './book-list-item';
import { ResultData } from './shared';
import { searchAPI, bookAPI } from './api-calls';
import AddBookModal from './add-book-modal';
import BookLoader from './loading-modal';
import Modal from 'react-modal';

interface Props {
  book: string;
  bookTitle: string;
}

const SearchResults = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<ResultData | null | undefined>();
  const [bookID, setBookID] = useState<string>();

  const location = useLocation();
  const parseSearch = new URLSearchParams(location.search);
  const title = parseSearch.get('title');

  const getResults = async () => {
    setIsOpen(true);
    setLoading(true);
    const results = await searchAPI(title);
    setIsOpen(false);
    setLoading(false);
    setQuery(results);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getResults();
  }, [location]);

  const openAddBook = (book: string) => {
    setBookID(book);
    openModal();
  };

  //@question maybe move to add book modal file?
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

  return (
    <div className="component-book-list">
      <div className="component-box">
        <Link className="home-button" to="/">
          Home
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
          {loading ? (
            <BookLoader></BookLoader>
          ) : (
            <AddBookModal
              submitAddBook={submitAddBook}
              closeModal={closeModal}
            ></AddBookModal>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default SearchResults;
