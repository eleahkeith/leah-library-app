import React from 'react';
import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';

interface SearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(' ');

  return (
    <div className="search-box">
      <input
        className="search-input"
        type="text"
        placeholder="search for a book title..."
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className="search-link-container">
        <Link
          id="search-link"
          key={searchTerm}
          to={`/search?title=${searchTerm}`}
        >
          Search
        </Link>
      </div>
    </div>
  );
};

export default Search;
