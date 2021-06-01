import React from 'react';
import '../styles/reset.css';
import '../styles/app.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookAPI } from './api-calls';
import { bookAPI } from './api-calls';
import Modal from 'react-modal';
import AddBookModal from './add-book-modal';
import BookLoader from './loading-modal';
import { parseISO, format } from 'date-fns';

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

  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [bookDetail, setBookDetail] = useState<BookDetailProps>();
  const [bookID, setBookID] = useState<string>(book.bookID);

  const getBookResults = async (bookID: string) => {
    setLoading(true);
    setIsOpen(true);
    const bkInfo = await getBookAPI(bookID);
    setIsOpen(false);
    setLoading(false);
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
    // eslint-disable-next-line
  }, []);

  const checkDate = (dateString: string | undefined) => {
    if (dateString) {
      const formattedDate = formatDate(dateString);
      return formattedDate;
    } else {
      return 'unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, 'PP');
    return formattedDate;
  };

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
          <div className="detail-component-title">
            <Link className="home-button" to="/home">
              Home
            </Link>

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
                  {checkDate(bookDetail?.publishedDate)}
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
      <Modal
        className={loading ? 'Modal-Loading' : 'Modal'}
        overlayClassName="overlay"
        isOpen={modalIsOpen}
      >
        {loading ? (
          <BookLoader></BookLoader>
        ) : (
          <AddBookModal
            submitAddBook={submitAddBook}
            closeModal={closeModal}
          ></AddBookModal>
        )}
      </Modal>
    </>
  );
};

export default BookDetail;
