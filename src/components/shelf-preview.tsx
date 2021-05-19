import React from 'react';
import { BookshelfPreviewProps, BookResultType } from './shared';
import { MY_STUB_SHELVES } from './stub-data';

interface ShelfProps {
  shelf: BookshelfPreviewProps;
}

const ShelfPreview = ({ shelf }: ShelfProps) => {
  const books = shelf.items;
  const mappedCoverImages = books.map((book) => (
    <img
      key={book.id}
      className="shelf-preview-image"
      src={book.imageURL || undefined}
      alt="book cover"
    />
  ));
  return (
    <div className="shelf-preview" key={shelf.shelfID}>
      <div className="shelf-preview-title">{shelf.shelfName}</div>
      <div className="shelf-preview-image-container">{mappedCoverImages}</div>
    </div>
  );
};

export default ShelfPreview;
