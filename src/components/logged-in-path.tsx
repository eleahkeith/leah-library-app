import React from 'react';
import Header from './header';
import Search from './search';
import Overview from './overview';
import SearchResults from './search-results';
import BookList from './book-list';
import BookDetail from './book-detail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const LoggedInPath = () => {
  return (
    <Router>
      <Route path="/home">
        <>
          <Header></Header>
          <Search></Search>
          <Switch>
            <Route exact path="/home">
              <Overview />
            </Route>
            <Route path="/search">
              <SearchResults />
            </Route>
            <Route path="/booklist/:shelfID">
              <BookList />
            </Route>
            <Route path="/bookdetail/:bookID">
              <BookDetail />
            </Route>
          </Switch>
        </>
      </Route>
    </Router>
  );
};

export default LoggedInPath;
