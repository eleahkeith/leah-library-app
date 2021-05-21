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
    <Link key={book.id} to={`/BookDetail/${book.id}`}>
      <img
        key={book.id}
        className="shelf-preview-image"
        src={book.imageURL || undefined}
        alt="book cover"
      />
    </Link>
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
      <Modal isOpen={modalIsOpen}>
        {isDeleting ? (
          <>
            <div className="modal-text">
              Are you sure you want to delete this shelf and all books saved
              here? This action cannot be undone.
            </div>
            <input type="button" value="go back" onClick={closeModal} />
            <input
              type="button"
              value="confirm delete shelf"
              onClick={handleDeleteSubmit}
            />
          </>
        ) : (
          <form>
            <input
              onChange={(e) => setShelfName(e.target.value)}
              placeholder="Enter new shelf name"
            ></input>
            <input type="button" value="go back" onClick={closeModal} />
            <input
              onChange={(e) => setShelfName(e.target.value)}
              type="button"
              value="Submit"
              onClick={handleEditSubmit}
            />
          </form>
        )}
      </Modal>
    </>
  );
};

export default ShelfPreview;
