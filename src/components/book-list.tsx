import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import BookListItem from './book-list-item';
import deleteButton from '../images/delete-button.png';
import { FavoritesListProps, BookResultType } from './shared';

interface Props {
  book: BookResultType;
  rightAccessory: React.ReactNode;
  children: React.ReactNode;
}

const BookList = ({
  favorites,
  handleDeleteFavorite,
  children,
}: FavoritesListProps) => {
  const favoritesList = favorites?.items || [];
  const mappedFavorites = favoritesList.map((favoriteItem) => (
    <BookListItem
      key={favoriteItem.id}
      book={favoriteItem}
      rightAccessory={
        <img
          id="add-delete-button"
          onClick={() => handleDeleteFavorite(favoriteItem.id)}
          src={deleteButton}
          alt="delete button"
        />
      }
    ></BookListItem>
  ));

  return (
    <div className="component-book-list">
      <div className="component-box">
        <div className="component-list-title">
          <div className="component-title-text">What I'm Reading</div>
          <div>{children}</div>
        </div>
        <div className="component-list-body">{mappedFavorites}</div>
      </div>
    </div>
  );
};

export default BookList;
