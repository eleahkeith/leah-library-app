import React from 'react';
import { useState, useEffect } from 'react';
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

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [shelves, setShelves] = useState<ShelfResultData>();
  const [newShelfName, setShelfName] = useState(' ');
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleType = (e: any) => {
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
    setLoading(true);
    const result = await getShelvesAPI();
    setLoading(false);
    setShelves(result);
  };

  const handleAddShelf = async () => {
    setLoading(true);
    await addShelfAPI(newShelfName);
    setLoading(false);
    showShelves();
    setShelfName(' ');
  };

  const handleDeleteShelf = async (shelfID: string) => {
    setLoading(true);
    await deleteShelfAPI(shelfID);
    setLoading(false);
    showShelves();
  };

  const handleEditShelf = async (shelfID: string, shelfName: string) => {
    setLoading(true);
    await editShelfAPI(shelfID, shelfName);
    setLoading(false);
    showShelves();
  };

  useEffect(() => {
    showShelves();
  }, []);

  const shelfResults = shelves?.items;
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
      <div className="component-box">
        <div className="add-shelf-container">
          <input
            type="button"
            value="Add New Shelf"
            className="button-on-light"
            id="add-shelf-button"
            onClick={openModal}
          />
        </div>
        <div className="bookshelf-preview-container">{mappedShelves}</div>
      </div>
      <Modal className="Modal" overlayClassName="overlay" isOpen={modalIsOpen}>
        <form className="shelf-form">
          <input
            className="modal-input"
            id="shelfName"
            name="shelfName"
            placeholder="Enter New Shelf Name"
            onChange={(e) => handleType(e)}
          ></input>
          <label htmlFor="shelfName" className="edit-label">
            Shelf Name
          </label>
          <div className="shelf-option-container">
            <input
              type="button"
              className="button-on-light"
              id="edit-button-modal"
              value="submit"
              onClick={handleAddSubmit}
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
      </Modal>
    </>
  );
};

export default Overview;
