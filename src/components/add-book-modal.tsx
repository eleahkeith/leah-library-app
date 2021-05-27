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
    <option
      className="shelf-option"
      key={shelfDetail.id}
      value={shelfDetail.id}
    >
      {shelfDetail.name}
    </option>
  ));

  return (
    <form className="shelf-form">
      <img
        className="modal-close-button"
        src={DeleteButton}
        alt="delete button"
        onClick={closeModal}
      />
      <select
        className="shelf-list-dropdown"
        onChange={(e) => setSelectedShelf(e.target.value)}
      >
        <option hidden value=" ">
          --select one--
        </option>
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
      </div>
    </form>
  );
};

export default AddBookModal;
