// notes: took out loading state in order to get router working, need to figure out how to add back in
// need to refactor to move potential duplicate states/functions into own component

import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import BookListItem from './book-list-item';
import deleteButton from '../images/delete-button.png';
import { useState, useEffect } from 'react';
import { getShelfBooksAPI } from './api-calls';
import { ShelfType, BookResultType } from './shared';
import { useParams } from 'react-router-dom';

interface Props {
  book: BookResultType;
  rightAccessory: React.ReactNode;
  children: React.ReactNode;
  items: BookResultType[];
}

interface ParamProps {
  shelf: string;
  shelfID: string;
}

const BookList = () => {
  const [loading, setLoading] = useState(false);
  const [bookList, setBookList] = useState<ShelfType>();

  const shelf = useParams<ParamProps>();

  // const handleDeleteFavorite = async (uniqueID: string) => {
  //   setLoading(true);
  //   await bookAPI('DELETE', uniqueID);
  //   setLoading(false);
  //   getFavorites();
  // };

  const getFavorites = async () => {
    setLoading(true);
    const apiResults = await getShelfBooksAPI(shelf.shelfID);
    const listResult = apiResults?.item;
    setBookList(listResult);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const favoritesList = bookList?.books || [];
  const mappedBookItems = favoritesList.map((bookListItem) => (
    <BookListItem
      key={bookListItem.id}
      book={bookListItem}
      rightAccessory={
        <img
          id="add-delete-button"
          // onClick={() => handleDeleteFavorite(bookListItem.id)}
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
          <div className="component-title-text">{bookList?.name}</div>
          <div></div>
        </div>
        <div className="component-list-body">{mappedBookItems}</div>
      </div>
    </div>
  );
};

export default BookList;
