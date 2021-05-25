import React from 'react';

interface DeleteShelfProps {
  handleDeleteSubmit: () => void;
  closeModal: () => void;
}

const DeleteShelfModal = ({
  handleDeleteSubmit,
  closeModal,
}: DeleteShelfProps) => {
  return (
    <div className="shelf-form">
      <div className="delete-modal-text-container">
        <span className="danger-text">Danger!</span>
        <span className="delete-modal-text">
          Are you sure you want to delete this shelf and all books saved here?
          This action cannot be undone.
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
  );
};

export default DeleteShelfModal;
