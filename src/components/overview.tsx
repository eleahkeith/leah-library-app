import React from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { ShelfResultData } from './shared';
import {
  addShelfAPI,
  deleteShelfAPI,
  getShelvesAPI,
  editShelfAPI,
} from './api-calls';
import Modal from 'react-modal';
import ShelfPreview from './shelf-preview';
import DeleteButton from '../images/delete-button.png';
import BookLoader from './loading-modal';

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [shelves, setShelves] = useState<ShelfResultData>();
  const [newShelfName, setShelfName] = useState(' ');
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleType = (e: ChangeEvent<HTMLInputElement>) => {
    setShelfName(e.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddSubmit = () => {
    handleAddShelf();
    closeModal();
  };

  const showShelves = async () => {
    setIsOpen(true);
    setLoading(true);
    const result = await getShelvesAPI();
    setIsOpen(false);
    setLoading(false);
    setShelves(result);
  };

  const handleAddShelf = async () => {
    await addShelfAPI(newShelfName);
    showShelves();
    setShelfName(' ');
  };

  const handleDeleteShelf = async (shelfID: string) => {
    await deleteShelfAPI(shelfID);
    showShelves();
  };

  const handleEditShelf = async (shelfID: string, shelfName: string) => {
    await editShelfAPI(shelfID, shelfName);
    showShelves();
  };

  useEffect(() => {
    showShelves();
  }, []);

  const { items: shelfResults } = shelves || {};

  const mappedShelves = shelfResults?.map((shelf) => (
    <ShelfPreview
      key={shelf.id}
      shelf={shelf}
      newShelfName={newShelfName}
      handleDeleteShelf={handleDeleteShelf}
      handleEditShelf={handleEditShelf}
      setShelfName={setShelfName}
    ></ShelfPreview>
  ));
  return (
    <>
      <main className="component-box">
        <div className="add-shelf-container">
          <button type="button" id="add-shelf" onClick={openModal}>
            Add Shelf
          </button>
        </div>
        <section className="overview">{mappedShelves}</section>
      </main>
      <Modal
        className={loading ? 'Modal-Loading' : 'Modal'}
        overlayClassName="overlay"
        isOpen={modalIsOpen}
      >
        {loading ? (
          <BookLoader></BookLoader>
        ) : (
          <form className="modal">
            <img
              className="modal-close"
              src={DeleteButton}
              alt="close button"
              onClick={closeModal}
            />
            <div>
              <input
                className="modal"
                id="shelfName"
                placeholder="Enter New Shelf Name"
                onChange={(e) => handleType(e)}
              ></input>
              <label htmlFor="shelfName">Shelf Name</label>
            </div>
            <div className="shelf-option-container">
              <button type="button" className="modal" onClick={handleAddSubmit}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default Overview;
