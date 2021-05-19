import React from 'react';
import { NewSearchProps } from './shared';

const NewSearch = ({ newSearch }: NewSearchProps) => {
  return (
    <button
      className="button-on-light"
      id="new-search-button"
      onClick={newSearch}
    >
      New Search
    </button>
  );
};

export default NewSearch;
