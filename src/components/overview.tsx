import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { ShelfResultData, ResultData } from './shared';
import {
  bookAPI,
  addShelfAPI,
  deleteShelfAPI,
  getShelvesAPI,
  editShelfAPI,
} from './api-calls';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import ShelfPreview from './shelf-preview';

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [shelves, setShelves] = useState<ShelfResultData>();
  const [favorites, setFavorites] = useState<ResultData>();
  const [newShelfName, setShelfName] = useState(' ');
  const [modalIsOpen, setIsOpen] = useState(false);

  const authToken = process.env.REACT_APP_AUTHORIZATION_TOKEN as string;

  const standardErrMsg =
    'There was an error processing your request. Please try again later!';

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
    console.log(result?.items);
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

  const handleDeleteFavorite = async (uniqueID: string) => {
    setLoading(true);
    await bookAPI('DELETE', uniqueID);
    setLoading(false);
    getFavorites();
  };

  const getFavorites = async () => {
    setLoading(true);
    const response = await fetch(
      'https://get-some-books.herokuapp.com/books/favourites',
      {
        headers: {
          Authorization: authToken,
        },
        method: 'GET',
      }
    );
    setLoading(false);
    const favorites = await response.json();
    setFavorites(favorites);

    if (!response.ok || favorites.success === false) {
      toast.error(standardErrMsg);
    }
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
          <input type="button" value="Add Shelf" onClick={openModal} />
        </div>
        <div className="bookshelf-preview-container">{mappedShelves}</div>
      </div>
      <Modal isOpen={modalIsOpen}>
        <form>
          <label htmlFor="shelfName">Shelf Name</label>
          <input
            id="shelfName"
            name="shelfName"
            onChange={(e) => handleType(e)}
          ></input>
          <input type="button" value="go back" onClick={closeModal} />
          <input type="button" value="submit" onClick={handleAddSubmit} />
        </form>
      </Modal>
    </>
  );
};

export default Overview;
