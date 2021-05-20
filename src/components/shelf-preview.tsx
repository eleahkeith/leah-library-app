import React from 'react';
import { ShelfType } from './shared';
import { Link } from 'react-router-dom';

interface ShelfProps {
  shelf: ShelfType;
  handleDeleteShelf: (shelfID: string) => void;
}

const ShelfPreview = ({ shelf, handleDeleteShelf }: ShelfProps) => {
  const bookList = shelf.books;
  const mappedCoverImages = bookList.map((book) => (
    <Link key={book.id} to={`/BookDetail/${book.id}`}>
      <img
        key={book.id}
        className="shelf-preview-image"
        src={book.imageURL || undefined}
        alt="book cover"
      />
    </Link>
  ));
  return (
    <div className="shelf-preview" key={shelf.id}>
      <div className="list-link-container">
        <Link
          className="book-list-link"
          key={shelf.id}
          to={`/BookList/${shelf.id}`}
        >
          See All
        </Link>
      </div>
      <div className="shelf-preview-title">{shelf.name}</div>
      <div className="shelf-preview-image-container">{mappedCoverImages}</div>
      <button onClick={() => handleDeleteShelf(shelf.id)}>Delete Shelf</button>
    </div>
  );
};

export default ShelfPreview;
