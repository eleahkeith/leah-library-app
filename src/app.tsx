import React from 'react';
import './styles/reset.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { ResultData, ShelfResultData } from './components/shared';
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/header';
import Search from './components/search';
import NewSearch from './components/new-search';
import SearchResults from './components/search-results';
import BookList from './components/book-list';
import bookLoader from './images/book-loader.gif';
import Overview from './components/overview';
import { shelvesAPI, searchAPI, bookAPI } from './components/api-calls';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(' ');
  const [query, setQuery] = useState<ResultData | undefined | null>();
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState<ResultData>();
  const [loading, setLoading] = useState(false);
  const [shelves, setShelves] = useState<ShelfResultData>();

  const authToken = '52507d8ca014fa48344b26258212f23a';

  const standardErrMsg =
    'There was an error processing your request. Please try again later!';

  const handleType = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const toggleSearching = () => {
    setSearching(!searching);
  };

  const newSearch = () => {
    toggleSearching();
    setQuery(undefined);
  };

  const handleSearch = async () => {
    toggleSearching();
    setLoading(true);
    const response = await searchAPI(searchTerm);
    setLoading(false);
    setQuery(response);
  };

  const handleAddFavorite = async (uniqueID: string) => {
    setLoading(true);
    await bookAPI('POST', uniqueID);
    setLoading(false);
    getFavorites();
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

  const showShelves = async () => {
    const result = await shelvesAPI();
    setShelves(result);
    console.log(result?.items);
  };

  useEffect(() => {
    showShelves();
  }, []);

  return (
    <>
      <Header></Header>
      <ToastContainer />
      {searching ? (
        <>
          <NewSearch newSearch={newSearch}></NewSearch>
          <SearchResults
            toggleSearching={toggleSearching}
            query={query}
            handleAddFavorite={handleAddFavorite}
          >
            {loading ? (
              <img className="loading-gif" src={bookLoader} alt=" " />
            ) : null}
          </SearchResults>
        </>
      ) : (
        <div>
          <Search handleType={handleType} handleSearch={handleSearch}></Search>
          <Overview showShelves={showShelves} shelves={shelves}></Overview>
          {/* <BookList
            favorites={favorites}
            getFavorites={getFavorites}
            handleDeleteFavorite={handleDeleteFavorite}
          >
            {loading ? (
              <img className="loading-gif" src={bookLoader} alt=" " />
            ) : null}
          </BookList> */}
        </div>
      )}
    </>
  );
};

export default App;
