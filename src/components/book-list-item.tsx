import React from 'react';
import { BookResultType } from './shared';
import { useHistory } from 'react-router-dom';
import '../styles/app.css';

interface BookListItemProps {
  book: BookResultType;
  rightAccessory: React.ReactNode;
}

const BookListItem = ({ book, rightAccessory }: BookListItemProps) => {
  const history = useHistory();

  const viewBookDetails = (bookID: string) => {
    history.push(`/BookDetail/${bookID}`);
  };

  return (
    <div
      className="book-preview"
      onClick={() => viewBookDetails(book.id)}
      key={book.id}
      id="list-book"
    >
      <img
        className="book-preview-image"
        src={book.imageURL || undefined}
        alt="book cover"
      />{' '}
      <div className="book-preview-text" key={book.id}>
        <div className="book-preview-title">{book.title}</div>
        <div className="book-preview-author">{book.author}</div>
      </div>
      <div id="add-delete-button">{rightAccessory}</div>
    </div>
  );
};

export default BookListItem;
