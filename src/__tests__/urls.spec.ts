import {
  shelfURL,
  bookURL,
  loginURL,
  registerURL,
  searchURL,
} from '../utils/urls';

const testBaseURL = 'https://mybibliofile.com';
const testShelfID = 'kajdfj3i3ks';
const testShelfName = 'new shelf';
const testBookID = 'as3n2ifjenmd';
const testSearchTerm = 'Pride and Prejudice';

describe('urls', () => {
  it('shelfURL: should return URL with shelf ID', () => {
    const testURL = shelfURL(testBaseURL, testShelfID);
    expect(testURL).toEqual('https://mybibliofile.com/shelves/kajdfj3i3ks');
  });
  it('shelfURL: should return URL with shelf ID and shelf name', () => {
    const testURL = shelfURL(testBaseURL, testShelfID, testShelfName);
    expect(testURL).toEqual(
      'https://mybibliofile.com/shelves/kajdfj3i3ks?name=new%20shelf'
    );
  });
  it('shelfURL: should return URL with shelf name but not shelf ID', () => {
    const testURL = shelfURL(testBaseURL, undefined, testShelfName);
    expect(testURL).toEqual(
      'https://mybibliofile.com/shelves?name=new%20shelf'
    );
  });
  it('shelfURL: should return URL with just shelves', () => {
    const testURL = shelfURL(testBaseURL);
    expect(testURL).toEqual('https://mybibliofile.com/shelves');
  });
  it('bookURL: should return URL with shelf ID and book ID', () => {
    const testURL = bookURL(testBaseURL, testBookID, testShelfID);
    expect(testURL).toEqual(
      'https://mybibliofile.com/shelves/kajdfj3i3ks/books?bookId=as3n2ifjenmd'
    );
  });
  it('bookURL: should return URL with no shelf ID', () => {
    const testURL = bookURL(testBaseURL, testBookID);
    expect(testURL).toEqual('https://mybibliofile.com/book?id=as3n2ifjenmd');
  });
  it('searchURL: should return URL with search term', () => {
    const testURL = searchURL(testBaseURL, testSearchTerm);
    expect(testURL).toEqual(
      'https://mybibliofile.com/books?title=Pride%20and%20Prejudice'
    );
  });
  it('registerURL: should return URL with /register', () => {
    const testURL = registerURL(testBaseURL);
    expect(testURL).toEqual('https://mybibliofile.com/register');
  });
  it('loginURL: should return URL with /login', () => {
    const testURL = loginURL(testBaseURL);
    expect(testURL).toEqual('https://mybibliofile.com/login');
  });
});
