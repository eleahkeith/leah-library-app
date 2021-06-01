import React, { useContext } from 'react';
import { UserContext } from '../user-context';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const { setLoggedIn } = useContext(UserContext);
  const history = useHistory();

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('Authorization');
    history.push('/login');
    toast.success('Successfully logged out');
  };
  return (
    <div className="logout-container">
      <button className="logout-button" onClick={() => onLogout()}>
        Log Out
      </button>
    </div>
  );
};

export default Logout;
