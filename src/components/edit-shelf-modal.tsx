import React from 'react';
import DeleteButton from '../images/delete-button.png';

interface EditShelfProps {
  setShelfName: (e: string) => void;
  handleEditSubmit: () => void;
  closeModal: () => void;
}

const EditShelfModal = ({
  setShelfName,
  handleEditSubmit,
  closeModal,
}: EditShelfProps) => {
  return (
    <>
      <form className="modal">
        <img
          className="modal-close"
          src={DeleteButton}
          alt="click to close modal"
          onClick={closeModal}
        />
        <div>
          <input
            id="shelfName"
            className="modal"
            onChange={(e) => setShelfName(e.target.value)}
            placeholder="Enter new shelf name"
          ></input>
          <label htmlFor="shelfName" className="modal">
            Shelf Name
          </label>
        </div>
        <div className="shelf-option-container">
          <button
            type="button"
            className="modal"
            onClick={() => handleEditSubmit()}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditShelfModal;
