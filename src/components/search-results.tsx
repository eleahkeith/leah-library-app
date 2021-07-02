import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  const title: string | null = parseSearch.get('title');

  const getResults = async () => {
    if (title) {
      setIsOpen(true);
      setLoading(true);
      const results = await searchAPI(title);
      setIsOpen(false);
      setLoading(false);
      setQuery(results);
    } else {
      toast.error('no search term provided');
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getResults();
    // eslint-disable-next-line
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

  const { total: totalResults, items: bookResults } = query || {};

  const mappedBooks = bookResults?.map((bookResult) => (
    <BookListItem
      book={bookResult}
      key={bookResult.id}
      rightAccessory={
        <img
          id="add-delete"
          onClick={() => openAddBook(bookResult.id)}
          src={addButton}
          alt="add favorite"
        />
      }
    />
  ));

  return (
    <>
      <main className="component-box">
        <section className="results">
          <header className="component" key={null}>
            <h3>Search Results</h3>
            <Link className="home-link" to="/home">
              Home
            </Link>
            <span className="results-number">Results: {totalResults}</span>
          </header>
          <div className="list">{mappedBooks}</div>
        </section>
      </main>
      <Modal
        className={loading ? 'Modal-Loading' : 'Modal'}
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
    </>
  );
};

export default SearchResults;
