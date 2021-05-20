import React from 'react';
import './styles/reset.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { ResultData, ShelfResultData } from './components/shared';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Search from './components/search';
import NewSearch from './components/new-search';
import SearchResults from './components/search-results';
import BookList from './components/book-list';
import BookDetail from './components/book-detail';
import bookLoader from './images/book-loader.gif';
import Overview from './components/overview';
import {
  getShelvesAPI,
  searchAPI,
  bookAPI,
  addShelfAPI,
  deleteShelfAPI,
} from './components/api-calls';

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
    setSearchTerm(' ');
  };

  //keeping here to use as model for getting items on each list, then will delete
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

  useEffect(() => {
    showShelves();
  }, []);

  return (
    <>
      <Router>
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
            <Search
              handleType={handleType}
              handleSearch={handleSearch}
            ></Search>
            <Switch>
              <Route exact path="/">
                <Overview />
              </Route>
              <Route path="/booklist/:shelfID">
                <BookList />
              </Route>
              <Route path="/bookdetail/:bookID">
                <BookDetail />
              </Route>
            </Switch>
          </div>
        )}
      </Router>
    </>
  );
};

export default App;
