import React, { useContext } from 'react';
import Header from './header';
import Search from './search';
import Overview from './overview';
import SearchResults from './search-results';
import BookList from './book-list';
import BookDetail from './book-detail';
import { UserContext } from '../user-context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const LoggedInPath = () => {
  const loginURL = '/home';
  const { loggedIn } = useContext(UserContext);

  return (
    <Router>
      <Route path={loginURL}>
        <Header></Header>
        <Search></Search>
        <Switch>
          {!loggedIn ? (
            <Redirect to="/login" />
          ) : (
            <>
              <Route exact path={loginURL}>
                <Overview />
              </Route>
              <Route path={`${loginURL}/search`}>
                <SearchResults />
              </Route>
              <Route path={`${loginURL}/booklist/:shelfID`}>
                <BookList />
              </Route>
              <Route path={`${loginURL}/bookdetail/:bookID`}>
                <BookDetail />
              </Route>
            </>
          )}
        </Switch>
      </Route>
    </Router>
  );
};

export default LoggedInPath;
