import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getShelvesAPI } from './api-calls';
import { ShelfResultData } from './shared';

interface AddProps {
  submitAddBook: (selectedShelf: string | undefined) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const AddBookModal = ({ submitAddBook, closeModal, isOpen }: AddProps) => {
  const [shelves, setShelves] = useState<ShelfResultData>();
  const [selectedShelf, setSelectedShelf] = useState<string>();

  const getShelfOptions = async () => {
    const shelves = await getShelvesAPI();
    setShelves(shelves);
  };

  useEffect(() => {
    getShelfOptions();
  }, []);

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
    <Modal className="Modal" overlayClassName="overlay" isOpen={isOpen}>
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
  );
};

export default AddBookModal;
