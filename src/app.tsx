import React from 'react';
import './styles/reset.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ResultData } from './components/shared';
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
import { searchAPI, bookAPI } from './components/api-calls';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(' ');
  const [query, setQuery] = useState<ResultData | undefined | null>();
  const [searching, setSearching] = useState(false);
  const [favorites, setFavorites] = useState<ResultData>();
  const [loading, setLoading] = useState(false);

  const toggleSearching = () => {
    setSearching(!searching);
  };

  const newSearch = () => {
    toggleSearching();
    setQuery(undefined);
  };

  //keeping here to use as model for getting items on each list, then will delete

  return (
    <>
      <Router>
        <Header></Header>
        <ToastContainer />
        <NewSearch newSearch={newSearch}></NewSearch>
        <Search></Search>
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route path="/searchresults/:bookTitle">
            <SearchResults />
          </Route>
          <Route path="/booklist/:shelfID">
            <BookList />
          </Route>
          <Route path="/bookdetail/:bookID">
            <BookDetail />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
