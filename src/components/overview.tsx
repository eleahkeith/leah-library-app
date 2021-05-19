import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { OverviewProps } from './shared';
import ShelfPreview from './shelf-preview';

const Overview = ({ shelves }: OverviewProps) => {
  const shelfResults = shelves?.items;
  const mappedShelves = shelfResults?.map((shelf) => (
    <ShelfPreview key={shelf.id} shelf={shelf}></ShelfPreview>
  ));
  return (
    <>
      <div className="component-box">
        <div className="bookshelf-preview-container">{mappedShelves}</div>
      </div>
    </>
  );
};

export default Overview;
