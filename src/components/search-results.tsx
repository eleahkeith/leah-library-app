// removed children button (add) while building new API calls, etc. Add back once complete.

import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';
import addButton from '../images/add-button.png';
import BookListItem from './book-list-item';
import { ResultData } from './shared';
import { searchAPI } from './api-calls';

interface Props {
  book: string;
  bookTitle: string;
}

const SearchResults = () => {
  const [query, setQuery] = useState<ResultData | null | undefined>();

  const location = useLocation();
  const parseSearch = new URLSearchParams(location.search);

  const title = parseSearch.get('title');

  const getResults = async () => {
    const results = await searchAPI(title);
    setQuery(results);
  };

  useEffect(() => {
    getResults();
  }, [location]);

  const totalResults = query?.total;
  const bookResults = query?.items || [];
  const mappedBooks = bookResults.map((bookResult) => (
    <BookListItem
      book={bookResult}
      key={bookResult.id}
      rightAccessory={
        <img
          id="add-delete-button"
          onClick={() => console.log('click')}
          src={addButton}
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
        </div>
        <div className="component-list-body">{mappedBooks}</div>
      </div>
    </div>
  );
};

export default SearchResults;
