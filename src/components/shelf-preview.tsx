import React from 'react';
import { ShelfType } from './shared';

interface ShelfProps {
  shelf: ShelfType;
}

const ShelfPreview = ({ shelf }: ShelfProps) => {
  const bookList = shelf.books;
  const mappedCoverImages = bookList.map((book) => (
    <img
      key={book.id}
      className="shelf-preview-image"
      src={book.imageURL || undefined}
      alt="book cover"
    />
  ));
  return (
    <div className="shelf-preview" key={shelf.id}>
      <div className="shelf-preview-title">{shelf.name}</div>
      <div className="shelf-preview-image-container">{mappedCoverImages}</div>
    </div>
  );
};

export default ShelfPreview;
