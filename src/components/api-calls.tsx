import { toast } from 'react-toastify';
import { BookResultType } from './shared';

// these are currently here to test, move to shared types once complete
interface ShelfProps {
  shelfAPI: () => ShelfResultData;
}

interface ShelfResultData {
  totalItems: number;
  items: BookResultType[];
  success: boolean;
}

interface ShelfType {
  id: string;
  name: string;
  bookIds: string[];
  books: BookResultType[];
}

const authToken = '52507d8ca014fa48344b26258212f23a';

const standardErrMsg =
  'There was an error processing your request. Please try again later!';

export const shelfAPI = async () => {
  const response = await fetch('https://get-some-books.herokuapp.com/shelves', {
    headers: {
      Authorization: authToken,
    },
    method: 'GET',
  });

  if (response.ok) {
    const data = await response.json();
    return data as ShelfResultData;
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};

export const showShelves = async () => {
  const result = await shelfAPI();
  console.log(result);
};
