// notes: took out loading state and books in order to get router working, need to figure out how to add back in
// need to refactor to move potential duplicate states/functions into own component

import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import BookListItem from './book-list-item';
import deleteButton from '../images/delete-button.png';
import { FavoritesListProps, BookResultType } from './shared';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { bookAPI } from './api-calls';
import { ResultData } from './shared';

interface Props {
  book: BookResultType;
  rightAccessory: React.ReactNode;
  children: React.ReactNode;
}

const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<ResultData>();

  const authToken = '52507d8ca014fa48344b26258212f23a';

  const standardErrMsg =
    'There was an error processing your request. Please try again later!';

  const handleDeleteFavorite = async (uniqueID: string) => {
    setLoading(true);
    await bookAPI('DELETE', uniqueID);
    setLoading(false);
    getFavorites();
  };

  const getFavorites = async () => {
    setLoading(true);
    const response = await fetch(
      'https://get-some-books.herokuapp.com/books/favourites',
      {
        headers: {
          Authorization: authToken,
        },
        method: 'GET',
      }
    );
    setLoading(false);
    const favorites = await response.json();
    setFavorites(favorites);

    if (!response.ok || favorites.success === false) {
      toast.error(standardErrMsg);
    }
  };

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
          <div></div>
        </div>
        <div className="component-list-body">{mappedFavorites}</div>
      </div>
    </div>
  );
};

export default BookList;
