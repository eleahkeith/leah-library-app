import React from 'react';
import { useState, useEffect } from 'react';
import { getShelvesAPI } from './api-calls';
import { ShelfResultData } from './shared';
import DeleteButton from '../images/delete-button.png';

interface AddProps {
  submitAddBook: (selectedShelf: string | undefined) => void;
  closeModal: () => void;
}

const AddBookModal = ({ submitAddBook, closeModal }: AddProps) => {
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
    <option key={shelfDetail.id} value={shelfDetail.id}>
      {shelfDetail.name}
    </option>
  ));

  return (
    <form className="modal">
      <img
        className="modal-close"
        src={DeleteButton}
        alt="click to close modal"
        onClick={closeModal}
      />
      <div>
        <select
          className="modal"
          onChange={(e) => setSelectedShelf(e.target.value)}
          id="shelf-list"
        >
          <option hidden value=" ">
            --select one--
          </option>
          {mappedShelfNames}
        </select>
        <label className="list" htmlFor="shelf-list">
          Select a List
        </label>
      </div>
      <div className="shelf-option-container">
        <button
          type="button"
          className="modal"
          onClick={() => submitAddBook(selectedShelf)}
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default AddBookModal;
