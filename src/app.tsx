import React from 'react';
import './styles/reset.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Search from './components/search';
import SearchResults from './components/search-results';
import BookList from './components/book-list';
import BookDetail from './components/book-detail';
import Overview from './components/overview';
import Login from './components/login';

const App = () => {
  return (
    <>
      <Router>
        <Login></Login>
        <Header></Header>
        <ToastContainer />
        <Search></Search>
        {/* <Switch>
          <Route exact path="/">
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
        </Switch> */}
      </Router>
    </>
  );
};

export default App;
