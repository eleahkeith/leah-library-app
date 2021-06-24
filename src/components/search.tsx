import React from 'react';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';

interface SearchProps {
  handleSearch: () => void;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>(' ');

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
    <section className="search-box">
      <input
        className="search"
        ref={inputRef}
        id="search-bar"
        type="text"
        placeholder="search for a book title..."
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className="search-link-container">
        <button type="button" id="search-button" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
