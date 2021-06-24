import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import headerImage from '../images/header-image.png';
import { useHistory } from 'react-router';

const Header = () => {
  const history = useHistory();

  const goHome = () => {
    history.push('/home');
  };
  return (
    <header onClick={goHome} className="header-box">
      <div className="header-text-box">
        <h1>
          <span className="title-1">biblio</span>
          <span className="title-2">file</span>
        </h1>
        <h2 className="header-title-subtext">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          The book lover's book tracker
        </h2>
      </div>
      <img
        className="header-image"
        src={headerImage}
        alt="drawing of brunette woman with glasses sitting against a stack of books, reading and drinking coffee while smiling"
      />
    </header>
  );
};

export default Header;
