import React from 'react';
import BookLoaderGIF from '../images/book-loader.gif';

const BookLoader = () => {
  return (
    <div className="loading-container">
      <span className="loading-text">Loading...</span>
      <img className="loading-gif" src={BookLoaderGIF} alt="book loader GIF" />
    </div>
  );
};

export default BookLoader;
