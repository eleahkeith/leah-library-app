import { BookResultType, BookshelfProps, BookshelvesProps } from './shared';

export const MY_STUB_BOOK: BookResultType = {
  author: 'Sam Piggott',
  googleLink: 'https://google.com',
  id: 'A16NdR8h-4AD',
  imageURL:
    'http://books.google.com/books/content?id=A16NdR8h-4AC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72MHHa6bkVeE0erZJlE-QMo8oFFM84Yoj_8mF2xAdEoqNjzv5OOXWcqHy_U5m4SpMxrcU5f8ecwRpcCgucmLioYNFMErMpqJE6PhBhXxvLuAAhPpjKF4sieFu66O-VZWxX5AgF5&source=gbs_api',
  pageCount: 400,
  publicDomain: true,
  publishedDate: '2002-06-04',
  title: 'I Have the Best Wife in the World',
};

export const MY_STUB_NEW_BOOK: BookResultType = {
  author: 'Luke Keith',
  googleLink: 'https://google.com',
  id: 'A16NdR8h-4AE',
  imageURL:
    'http://books.google.com/books/content?id=A16NdR8h-4AC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72MHHa6bkVeE0erZJlE-QMo8oFFM84Yoj_8mF2xAdEoqNjzv5OOXWcqHy_U5m4SpMxrcU5f8ecwRpcCgucmLioYNFMErMpqJE6PhBhXxvLuAAhPpjKF4sieFu66O-VZWxX5AgF5&source=gbs_api',
  pageCount: 200,
  publicDomain: false,
  publishedDate: '2002-06-04',
  title: 'Tales from a Chicken Murderer',
};

export const MY_STUB_SHELF_ONE: BookshelfProps = {
  total: 3,
  items: [MY_STUB_BOOK, MY_STUB_BOOK, MY_STUB_BOOK],
  success: true,
  shelfID: '1111111',
  shelfName: "What I'm Reading",
};

export const MY_STUB_SHELF_TWO: BookshelfProps = {
  total: 3,
  items: [MY_STUB_BOOK, MY_STUB_BOOK, MY_STUB_BOOK],
  success: true,
  shelfID: '2222222',
  shelfName: "What I've Read",
};

export const MY_STUB_SHELF_THREE: BookshelfProps = {
  total: 3,
  items: [MY_STUB_BOOK, MY_STUB_BOOK, MY_STUB_BOOK],
  success: true,
  shelfID: '2222222',
  shelfName: "What I'll Read Soon",
};

export const MY_STUB_SHELVES: BookshelvesProps = {
  total: 3,
  items: [MY_STUB_SHELF_ONE, MY_STUB_SHELF_TWO, MY_STUB_SHELF_THREE],
  success: true,
};
