// notes: took out loading state in order to get router working, need to figure out how to add back in
// need to refactor to move potential duplicate states/functions into own component

import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import BookListItem from './book-list-item';
import EditShelfModal from './edit-shelf-modal';
import DeleteShelfModal from './delete-shelf-modal';
import BookLoader from './loading-modal';
import deleteButton from '../images/delete-button.png';
import { useState, useEffect } from 'react';
import {
  getShelfBooksAPI,
  editShelfAPI,
  deleteShelfAPI,
  bookAPI,
} from './api-calls';
import { ShelfType, BookResultType } from './shared';
import { useParams, useHistory, Link } from 'react-router-dom';
import Modal from 'react-modal';

interface Props {
  book: BookResultType;
  rightAccessory: React.ReactNode;
  children: React.ReactNode;
  items: BookResultType[];
}

interface ParamProps {
  shelf: string;
  shelfID: string;
}

const BookList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookList, setBookList] = useState<ShelfType>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [newShelfName, setShelfName] = useState(' ');

  const shelf = useParams<ParamProps>();

  const history = useHistory();

  const getListBooks = async () => {
    setIsOpen(true);
    setLoading(true);
    const apiResults = await getShelfBooksAPI(shelf.shelfID);
    const listResult = apiResults?.item;
    setBookList(listResult);
    setLoading(false);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsDeleting(false);
  };

  const openEditModal = () => {
    setIsDeleting(false);
    openModal();
  };

  const openDeleteModal = () => {
    setIsDeleting(true);
    openModal();
  };

  const handleDeleteShelf = async (shelfID: string) => {
    await deleteShelfAPI(shelfID);
  };

  const handleDeleteSubmit = async () => {
    await handleDeleteShelf(shelf.shelfID);
    closeModal();
    history.push('/home');
  };

  const handleEditShelf = async (shelfID: string, shelfName: string) => {
    await editShelfAPI(shelfID, shelfName);
  };

  const handleEditSubmit = async () => {
    await handleEditShelf(shelf.shelfID, newShelfName);
    closeModal();
    getListBooks();
  };

  const handleDeleteBook = async (uniqueID: string) => {
    setIsOpen(true);
    setLoading(true);
    await bookAPI('DELETE', uniqueID, shelf.shelfID);
    setLoading(false);
    setIsOpen(false);
    getListBooks();
  };

  useEffect(() => {
    getListBooks();
    // eslint-disable-next-line
  }, []);

  const { books: favoritesList } = bookList || {};
  const mappedBookItems = favoritesList?.map((bookListItem) => (
    <BookListItem
      key={bookListItem.id}
      book={bookListItem}
      rightAccessory={
        <img
          id="add-delete"
          onClick={() => handleDeleteBook(bookListItem.id)}
          src={deleteButton}
          alt="delete book"
        />
      }
    ></BookListItem>
  ));

  return (
    <>
      <main className="component-box">
        <section className="book-list">
          <header className="component">
            <h3>{bookList?.name}</h3>
            <nav>
              <Link className="home-link" to="/home">
                Home
              </Link>
            </nav>

            <div className="shelf-option-container">
              <div onClick={openEditModal} className="shelf-option">
                Edit Shelf
              </div>
              <div onClick={openDeleteModal} className="shelf-option">
                Delete Shelf
              </div>
            </div>
          </header>
          <div className="list">{mappedBookItems}</div>
        </section>
      </main>

      <Modal
        className={loading ? 'Modal-Loading' : 'Modal'}
        overlayClassName="overlay"
        isOpen={modalIsOpen}
      >
        {' '}
        {loading ? (
          <BookLoader></BookLoader>
        ) : isDeleting ? (
          <DeleteShelfModal
            handleDeleteSubmit={handleDeleteSubmit}
            closeModal={closeModal}
          ></DeleteShelfModal>
        ) : (
          <EditShelfModal
            setShelfName={setShelfName}
            handleEditSubmit={handleEditSubmit}
            closeModal={closeModal}
          ></EditShelfModal>
        )}
      </Modal>
    </>
  );
};

export default BookList;
