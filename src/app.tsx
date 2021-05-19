import React from 'react';
import './styles/reset.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { ResultData } from './components/shared';
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/header';
import Search from './components/search';
import NewSearch from './components/new-search';
import SearchResults from './components/search-results';
import BookList from './components/book-list';
import bookLoader from './images/book-loader.gif';
// import Overview from './components/overview';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(' ');
  const [query, setQuery] = useState<ResultData>();
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState<ResultData>();
  const [loading, setLoading] = useState(false);

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

  const handleSearch = async (e: any) => {
    toggleSearching();
    setLoading(true);
    const response = await fetch(
      `https://get-some-books.herokuapp.com/books?title=${searchTerm}`,
      {
        headers: {
          Authorization: authToken,
        },
        method: 'GET',
      }
    );
    setLoading(false);
    if (response.ok) {
      const data = await response.json();

      if (!data.success) {
        toast.error(standardErrMsg);
      } else {
        setQuery(data);
        console.log(data);
        console.log(searchTerm);
      }
    }
  };

  const handleAddFavorite = async (uniqueID: string) => {
    setLoading(true);
    const response = await fetch(
      `https://get-some-books.herokuapp.com/books/${uniqueID}/favourite`,
      {
        headers: {
          Authorization: authToken,
        },
        method: 'POST',
      }
    );
    setLoading(false);

    if (response.ok) {
      const data = await response.json();

      if (data.success === true) {
        toast.success('Added!');
        getFavorites();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(standardErrMsg);
    }
  };

  const handleDeleteFavorite = async (uniqueID: string) => {
    setLoading(true);
    const response = await fetch(
      `https://get-some-books.herokuapp.com/books/${uniqueID}/favourite`,
      {
        headers: {
          Authorization: authToken,
        },
        method: 'DELETE',
      }
    );

    setLoading(false);

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        toast.success('Deleted!');
        getFavorites();
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(standardErrMsg);
    }
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
    getFavorites();
  }, []);

  return (
    <>
      <Header></Header>
      <ToastContainer />
      {/* <Overview></Overview> */}
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
          <BookList
            favorites={favorites}
            getFavorites={getFavorites}
            handleDeleteFavorite={handleDeleteFavorite}
          >
            {loading ? (
              <img className="loading-gif" src={bookLoader} alt=" " />
            ) : null}
          </BookList>
        </div>
      )}
    </>
  );
};

export default App;
