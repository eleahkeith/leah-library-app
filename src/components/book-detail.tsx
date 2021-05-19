import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';

const BookDetail = () => {
  return (
    <div className="component-box">
      <div className="detail-title-author-container">
        <span className="detail-title">Book Title</span>
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
