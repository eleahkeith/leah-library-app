import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/reset.css';
import '../styles/app.css';

interface SearchProps {
  handleSearch: (e: any) => void;
  handleType: (e: any) => void;
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
      <Link key={searchTerm} to={`/search?title=${searchTerm}`}>
        <div>Search</div>
      </Link>
    </div>
  );
};

export default Search;
