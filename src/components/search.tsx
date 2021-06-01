import React from 'react';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';

interface SearchProps {
  handleSearch: () => void;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(' ');

  const inputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();
  const clearSearch = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = ' ';
    }
  };

  const handleSearch = () => {
    history.replace(`/home/search?title=${searchTerm}`);
    clearSearch();
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
        <input
          type="button"
          className="button-on-light"
          id="search-button"
          value="Search"
          onClick={() => handleSearch()}
        />
      </div>
    </div>
  );
};

export default Search;
