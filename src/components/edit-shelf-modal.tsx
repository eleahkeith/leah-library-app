import React from 'react';

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
            onClick={() => handleEditSubmit()}
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
    </>
  );
};

export default EditShelfModal;
