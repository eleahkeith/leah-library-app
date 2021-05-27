import React from 'react';
import BookLoaderGIF from '../images/book-loader.gif';

const BookLoader = () => {
  return (
    <img className="loading-gif" src={BookLoaderGIF} alt="book loader GIF" />
  );
};

export default BookLoader;
