import React from 'react';
import { useState } from 'react';
import { ShelfType } from './shared';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

interface ShelfProps {
  shelf: ShelfType;
  handleDeleteShelf: (shelfID: string) => void;
  handleEditShelf: (shelfID: string, shelfName: string) => void;
  setShelfName: (e: string) => void;
  newShelfName: string;
}

const ShelfPreview = ({
  shelf,
  handleDeleteShelf,
  setShelfName,
  newShelfName,
  handleEditShelf,
}: ShelfProps) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsDeleting(false);
  };

  const openDeleteModal = () => {
    setIsDeleting(true);
    openModal();
  };

  const openEditModal = () => {
    setIsDeleting(false);
    openModal();
  };

  const handleEditSubmit = () => {
    handleEditShelf(shelf.id, newShelfName);
    closeModal();
  };

  const handleDeleteSubmit = () => {
    handleDeleteShelf(shelf.id);
    closeModal();
  };

  const bookList = shelf.books;
  const mappedCoverImages = bookList.map((book) => (
    <div key={book.id} className="single-preview-image-container">
      <Link key={book.id} to={`/BookDetail/${book.id}`}>
        <img
          key={book.id}
          className="shelf-preview-image"
          src={book.imageURL || undefined}
          alt="book cover"
        />
      </Link>
    </div>
  ));
  return (
    <>
      <div className="shelf-preview" key={shelf.id}>
        <div className="list-link-container">
          <Link
            className="book-list-link"
            key={shelf.id}
            to={`/BookList/${shelf.id}`}
          >
            See All
          </Link>
        </div>
        <div className="shelf-title-container">
          <div className="shelf-preview-title">{shelf.name}</div>
          <div className="shelf-options-container">
            <div onClick={openEditModal} className="shelf-option">
              Edit Shelf
            </div>
            <div onClick={openDeleteModal} className="shelf-option">
              Delete Shelf
            </div>
          </div>
        </div>
        <div className="shelf-preview-image-container">{mappedCoverImages}</div>
      </div>
      <Modal className="Modal" overlayClassName="overlay" isOpen={modalIsOpen}>
        {isDeleting ? (
          <div className="shelf-form">
            <div className="delete-modal-text-container">
              <span className="danger-text">Danger!</span>
              <span className="delete-modal-text">
                Are you sure you want to delete this shelf and all books saved
                here? This action cannot be undone.
              </span>
            </div>
            <div className="shelf-option-container">
              <input
                type="button"
                className="button-on-light"
                id="delete-button-modal"
                value="confirm delete shelf"
                onClick={handleDeleteSubmit}
              />
              <input
                type="button"
                className="button-on-light"
                id="edit-button-modal"
                value="go back"
                onClick={closeModal}
              />
            </div>
          </div>
        ) : (
          <form className="shelf-form">
            <input
              className="modal-input"
              onChange={(e) => setShelfName(e.target.value)}
              placeholder="Enter new shelf name"
            ></input>
            <label htmlFor="shelfName" className="edit-label">
              Shelf Name
            </label>
            <div className="shelf-option-container">
              <input
                onChange={(e) => setShelfName(e.target.value)}
                type="button"
                className="button-on-light"
                id="edit-button-modal"
                value="Submit"
                onClick={handleEditSubmit}
              />
              <input
                type="button"
                className="button-on-light"
                id="edit-button-modal"
                value="go back"
                onClick={closeModal}
              />
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default ShelfPreview;
