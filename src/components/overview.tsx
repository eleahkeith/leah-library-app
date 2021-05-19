import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { OverviewProps } from './shared';
import ShelfPreview from './shelf-preview';

const Overview = ({
  shelves,
  handleAddShelf,
  handleType,
  handleDeleteShelf,
}: OverviewProps) => {
  const shelfResults = shelves?.items;
  const mappedShelves = shelfResults?.map((shelf) => (
    <ShelfPreview
      key={shelf.id}
      shelf={shelf}
      handleDeleteShelf={handleDeleteShelf}
    ></ShelfPreview>
  ));
  return (
    <>
      <div className="component-box">
        <div className="bookshelf-preview-container">{mappedShelves}</div>
      </div>
      <form>
        <label htmlFor="shelfName">Shelf Name</label>
        <input
          id="shelfName"
          name="shelfName"
          onChange={(e) => handleType(e)}
        ></input>
        <input type="button" value="submit" onClick={() => handleAddShelf()} />
      </form>
    </>
  );
};

export default Overview;
