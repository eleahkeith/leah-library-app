import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookAPI } from './api-calls';

type Params = {
  book: string;
  bookID: string;
};

const BookDetail = () => {
  const [bookDetail, setBookDetail] = useState({});
  const book = useParams<Params>();

  const bookID = book.bookID;

  return (
    <div className="component-box">
      <div className="detail-title-author-container">
        <span className="detail-title">{bookID}</span>
        <br />
        <span className="detail-author">Book Author</span>
      </div>
      <img className="detail-image" />
      <div className="plot-summary"></div>
      <div className="book-details">
        <div>
          <span className="detail-label">Published Date:</span>
          <span className="detail-field"></span>
        </div>
        <div>
          <span className="detail-label">Google Books Link:</span>
          <span className="detail-field"></span>
        </div>
        <div>
          <span className="detail-label">Page Count:</span>
          <span className="detail-field"></span>
        </div>
        <div>
          <span className="detail-label">Public Domain:</span>
          <span className="detail-field"></span>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
