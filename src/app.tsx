import React, { useState, useEffect } from 'react';
import './styles/reset.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import background from './images/background.jpg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './components/login';
import LoggedInPath from './components/logged-in-path';
import { UserContext } from './user-context';
import Modal from 'react-modal';

const App = () => {
  Modal.setAppElement('#root');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const authToken = localStorage.getItem('Authorization');

  const checkLogIn = async () => {
    if (authToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    return loggedIn;
  };

  const onLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    checkLogIn();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <img
        src={background}
        className="background"
        alt="bookshelves full of books"
      />

      <Router>
        <Switch>
          {loggedIn ? (
            <Route exact path="/home">
              <LoggedInPath />
            </Route>
          ) : (
            <Route path="/login">
              <Login onLogin={onLogin} />
            </Route>
          )}
          <Redirect to={loggedIn ? '/home' : '/login'} />
        </Switch>
        <ToastContainer
          autoClose={1200}
          pauseOnFocusLoss={false}
          limit={2}
          hideProgressBar={true}
        />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
