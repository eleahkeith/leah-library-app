import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';

interface SearchProps {
  handleSearch: (e: any) => void;
  handleType: (e: any) => void;
}

const Search = ({ handleType, handleSearch }: SearchProps) => {
  return (
    <div className="search-box">
      <input
        className="search-input"
        type="text"
        placeholder="search for a book title..."
        onChange={(e) => handleType(e)}
      ></input>
      <button
        className="button-on-light"
        id="search-button"
        value="search"
        onClick={(e) => handleSearch(e)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
