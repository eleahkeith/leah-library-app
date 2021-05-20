import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { OverviewProps, ShelfResultData, ResultData } from './shared';
import {
  bookAPI,
  addShelfAPI,
  deleteShelfAPI,
  getShelvesAPI,
} from './api-calls';
import { toast } from 'react-toastify';
import ShelfPreview from './shelf-preview';

const Overview = () => {
  const [loading, setLoading] = useState(false);
  const [shelves, setShelves] = useState<ShelfResultData>();
  const [favorites, setFavorites] = useState<ResultData>();
  const [searchTerm, setSearchTerm] = useState(' ');

  const authToken = process.env.REACT_APP_AUTHORIZATION_TOKEN as string;

  const standardErrMsg =
    'There was an error processing your request. Please try again later!';

  const handleType = (e: any) => {
    setSearchTerm(e.target.value);
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
    await addShelfAPI(searchTerm);
    setLoading(false);
    showShelves();
    setSearchTerm(' ');
  };

  const handleDeleteShelf = async (shelfID: string) => {
    setLoading(true);
    await deleteShelfAPI(shelfID);
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
      handleDeleteShelf={handleDeleteShelf}
    ></ShelfPreview>
  ));
  return (
    <>
      <div className="component-box">
        <div className="bookshelf-preview-container">{mappedShelves}</div>
      </div>
      <form>
        <label htmlFor="shelfName">Shelf Name</label>
        <input
          id="shelfName"
          name="shelfName"
          onChange={(e) => handleType(e)}
        ></input>
        <input type="button" value="submit" onClick={() => handleAddShelf()} />
      </form>
    </>
  );
};

export default Overview;
