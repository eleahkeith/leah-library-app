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
    <div onClick={goHome} className="header-box">
      <div className="header-text-box">
        <div className="header-title-text">
          <span className="title-1">biblio</span>
          <span className="title-2">file</span>
        </div>
        <div className="header-title-subtext">
          <ul>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <li>The book lover's book tracker</li>
          </ul>
        </div>
      </div>
      <img
        className="header-image"
        src={headerImage}
        alt="drawing of brunette woman with glasses sitting against a stack of books, reading and drinking coffee while smiling"
      />
    </div>
  );
};

export default Header;
