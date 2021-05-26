import React from 'react';
import { useState } from 'react';
import { ShelfType } from './shared';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import EditShelfModal from './edit-shelf-modal';
import DeleteShelfModal from './delete-shelf-modal';

interface ShelfPreviewProps {
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
}: ShelfPreviewProps) => {
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

export default ShelfPreview;
