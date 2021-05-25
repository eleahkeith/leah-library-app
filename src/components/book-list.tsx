// notes: took out loading state in order to get router working, need to figure out how to add back in
// need to refactor to move potential duplicate states/functions into own component

import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import BookListItem from './book-list-item';
import EditShelfModal from './edit-shelf-modal';
import deleteButton from '../images/delete-button.png';
import { useState, useEffect } from 'react';
import {
  getShelfBooksAPI,
  bookAPI,
  editShelfAPI,
  deleteShelfAPI,
} from './api-calls';
import { ShelfType, BookResultType } from './shared';
import { useParams } from 'react-router-dom';
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

  // const handleDeleteFavorite = async (uniqueID: string) => {
  //   setLoading(true);
  //   await bookAPI('DELETE', uniqueID);
  //   setLoading(false);
  //   getFavorites();
  // };

  const getFavorites = async () => {
    setLoading(true);
    const apiResults = await getShelfBooksAPI(shelf.shelfID);
    const listResult = apiResults?.item;
    setBookList(listResult);
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
    setLoading(true);
    await deleteShelfAPI(shelfID);
    setLoading(false);
  };

  const handleEditShelf = async (shelfID: string, shelfName: string) => {
    setLoading(true);
    await editShelfAPI(shelfID, shelfName);
    setLoading(false);
  };

  const handleEditSubmit = async () => {
    await handleEditShelf(shelf.shelfID, newShelfName);
    closeModal();
    getFavorites();
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const favoritesList = bookList?.books || [];
  const mappedBookItems = favoritesList.map((bookListItem) => (
    <BookListItem
      key={bookListItem.id}
      book={bookListItem}
      rightAccessory={
        <img
          id="add-delete-button"
          // onClick={() => handleDeleteFavorite(bookListItem.id)}
          src={deleteButton}
          alt="delete button"
        />
      }
    ></BookListItem>
  ));

  return (
    <>
      <div className="component-book-list">
        <div className="component-box">
          <div className="component-list-title">
            <div className="component-title-text">{bookList?.name}</div>
            <div className="shelf-options-container">
              <div onClick={openEditModal} className="shelf-option">
                Edit Shelf
              </div>
              <div onClick={openDeleteModal} className="shelf-option">
                Delete Shelf
              </div>
            </div>
          </div>
          <div className="component-list-body">{mappedBookItems}</div>
        </div>
      </div>
      <Modal className="Modal" overlayClassName="overlay" isOpen={modalIsOpen}>
        {' '}
        {!isDeleting ? (
          <EditShelfModal
            setShelfName={setShelfName}
            handleEditSubmit={handleEditSubmit}
            closeModal={closeModal}
          ></EditShelfModal>
        ) : (
          <div>hello</div>
        )}
      </Modal>
    </>
  );
};

export default BookList;
