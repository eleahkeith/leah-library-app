import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getBookAPI } from './api-calls';
import { bookAPI } from './api-calls';
import AddBookModal from './add-book-modal';
import LeftArrow from '../images/left-arrow.png';

type Params = {
  book: string;
  bookID: string;
};

interface BookDetailProps {
  id: string;
  googleLink: string;
  title: string | undefined;
  author: string | undefined;
  publishedDate: string;
  pageCount: number;
  imageURL: string;
  publicDomain: boolean;
  success: boolean;
}

const BookDetail = () => {
  const book = useParams<Params>();

  const history = useHistory();

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [bookDetail, setBookDetail] = useState<BookDetailProps>();
  const [bookID, setBookID] = useState<string>(book.bookID);

  const getBookResults = async (bookID: string) => {
    const bkInfo = await getBookAPI(bookID);
    setBookDetail(bkInfo);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getBookResults(bookID);
  }, []);

  const submitAddBook = async (shelfID: string | undefined) => {
    await bookAPI('PUT', bookID, shelfID);
    closeModal();
  };

  const isPublicDomain = (boolean: boolean | undefined) => {
    if (boolean) {
      return 'Yes';
    } else if (!boolean) {
      return 'No';
    }
  };

  return (
    <>
      <div className="component-box">
        <div className="detail-component">
          <div className="detail-nav" onClick={() => history.goBack()}>
            <img className="left-arrow" src={LeftArrow} alt="left arrow" />
            <span>Go Back</span>
          </div>
          <div className="detail-component-title">
            <div className="detail-title-text">Book Detail</div>
            <div className="shelf-options-container">
              <div className="shelf-option" onClick={() => openModal()}>
                Add to List
              </div>
            </div>
          </div>
          <img
            className="detail-image"
            src={bookDetail?.imageURL}
            alt="book cover"
          />
          <div className="book-detail-container">
            <div className="detail-title-author-container">
              <span className="detail-title">{bookDetail?.title}</span>
              <br />
              <span className="detail-author">{bookDetail?.author}</span>
            </div>

            <div className="plot-summary"></div>
            <div className="book-additional-details">
              <div className="single-detail-container">
                <span className="detail-label">Published: </span>
                <span className="detail-field">
                  {bookDetail?.publishedDate}
                </span>
              </div>
              <div className="single-detail-container">
                <span className="detail-label">Page Count: </span>
                <span className="detail-field">{bookDetail?.pageCount}</span>
              </div>
              <div className="single-detail-container">
                <span className="detail-label">Public Domain: </span>
                <span className="detail-field">
                  {isPublicDomain(bookDetail?.publicDomain)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddBookModal
        isOpen={modalIsOpen}
        submitAddBook={submitAddBook}
        closeModal={closeModal}
      ></AddBookModal>
    </>
  );
};

export default BookDetail;
