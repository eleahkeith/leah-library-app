import React from 'react';
import DeleteButton from '../images/delete-button.png';

interface DeleteShelfProps {
  handleDeleteSubmit: () => void;
  closeModal: () => void;
}

const DeleteShelfModal = ({
  handleDeleteSubmit,
  closeModal,
}: DeleteShelfProps) => {
  return (
    <form className="modal">
      <img
        className="modal-close"
        src={DeleteButton}
        alt="delete button"
        onClick={closeModal}
      />
      <div className="danger">Danger!</div>
      <p>
        Are you sure you want to delete this shelf and all books saved here?
        This action cannot be undone.
      </p>
      <div className="modal-btn-container">
        <button type="button" id="delete" onClick={handleDeleteSubmit}>
          confirm delete shelf
        </button>
        <button
          type="button"
          className="modal"
          id="goback"
          onClick={closeModal}
        >
          go back
        </button>
      </div>
    </form>
  );
};

export default DeleteShelfModal;
