import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import addDeleteButton from '../images/add-delete-button.png';
import BookListItem from './book-list-item';
import { SearchResultsProps } from './shared';

const SearchResults = ({
  query,
  handleAddFavorite,
  children,
}: SearchResultsProps) => {
  const totalResults = query?.total;
  const bookResults = query?.items || [];
  const mappedBooks = bookResults.map((bookResult) => (
    <BookListItem
      book={bookResult}
      key={bookResult.id}
      rightAccessory={
        <img
          id="add-delete-button"
          onClick={() => handleAddFavorite(bookResult.id)}
          src={addDeleteButton}
          alt="add favorite button"
        />
      }
    />
  ));

  return (
    <div className="component-book-list">
      <div className="component-box">
        <div className="component-list-title" key={null}>
          <div className="component-title-text">
            <span className="list-title">Search Results</span>
            <span className="results-number">Results: {totalResults}</span>
          </div>
          <div className="loading-state-container">{children}</div>
        </div>
        <div className="component-list-body">{mappedBooks}</div>
      </div>
    </div>
  );
};

export default SearchResults;
