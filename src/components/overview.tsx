import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { MY_STUB_SHELVES } from './stub-data';
import ShelfPreview from './shelf-preview';

const Overview = () => {
  const shelves = MY_STUB_SHELVES.items;
  const mappedShelves = shelves.map((shelf) => (
    <ShelfPreview key={shelf.shelfName} shelf={shelf}></ShelfPreview>
  ));
  return (
    <div className="component-box">
      <div className="bookshelf-preview-container">{mappedShelves}</div>
    </div>
  );
};

export default Overview;
