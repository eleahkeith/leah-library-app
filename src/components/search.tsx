import React from 'react';
import { useState, ChangeEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';

interface SearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(' ');

  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = ' ';
    }
  };

  return (
    <div className="search-box">
      <input
        className="search-input"
        ref={inputRef}
        id="search-bar"
        type="text"
        placeholder="search for a book title..."
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className="search-link-container">
        <Link
          id="search-link"
          key={searchTerm}
          to={`home/search?title=${searchTerm}`}
          onClick={clearSearch}
        >
          Search
        </Link>
      </div>
    </div>
  );
};

export default Search;
