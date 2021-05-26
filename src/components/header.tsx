import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import bookshelf from '../images/book-shelf.png';
import headerImage from '../images/header-image.png';
import { useHistory } from 'react-router';

const Header = () => {
  const history = useHistory();

  const goHome = () => {
    history.push('/');
  };
  return (
    <div onClick={goHome} className="header-box">
      <img
        className="shelf-image"
        src={bookshelf}
        alt="drawing of book shelf"
      />
      <div className="header-text-box">
        <div className="header-title-text">Leah's Library</div>
        <div className="header-title-subtext">
          <ul>
            <li>Welcome to my library!</li>
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
