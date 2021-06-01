import React, { useState, useEffect } from 'react';
import './styles/reset.css';
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './components/login';
import LoggedInPath from './components/logged-in-path';
import { UserContext } from './user-context';

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const authToken = localStorage.getItem('Authorization');

  const checkLogIn = async () => {
    if (authToken) {
      setLoggedIn(true);
      console.log('logged in');
    } else {
      setLoggedIn(false);
      console.log('not logged in');
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
