// removed children button (add) while building new API calls, etc. Add back once complete.

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../styles/reset.css';
import '../styles/app.css';
import addButton from '../images/add-button.png';
import BookListItem from './book-list-item';
import { SearchResultsProps, ResultData } from './shared';
import { searchAPI } from './api-calls';

interface Props {
  searchParam: string;
  bookTitle: string;
}

const SearchResults = () => {
  const [query, setQuery] = useState<ResultData | null | undefined>();
  const searchParam = useParams<Props>();
  const book = searchParam.bookTitle;
  console.log(book);

  const getResults = async () => {
    const results = await searchAPI(book);
    setQuery(results);
  };

  useEffect(() => {
    getResults();
  }, []);

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
