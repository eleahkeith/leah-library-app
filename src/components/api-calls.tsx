import { toast } from 'react-toastify';
import { ResultData, ShelfResultData } from './shared';

// these are currently here to test, move to shared types once complete

const authToken = '52507d8ca014fa48344b26258212f23a';

const standardErrMsg =
  'There was an error processing your request. Please try again later!';

export const getShelvesAPI = async () => {
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
    return undefined;
  }
};

export const editShelfAPI = async (shelfID: string, shelfName: string) => {
  const response = await fetch(
    `https://get-some-books.herokuapp.com/shelves/${shelfID}?name=${shelfName}`,
    {
      headers: {
        Authorization: authToken,
      },
      method: 'PUT',
    }
  );

  if (response.ok) {
    const data = await response.json();

    if (data.success) {
      toast.success('Success!');
      return data;
    } else {
      toast.error(data.message);
      return null;
    }
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};

export const deleteShelfAPI = async (shelfID: string) => {
  const response = await fetch(
    `https://get-some-books.herokuapp.com/shelves/${shelfID}`,
    {
      headers: {
        Authorization: authToken,
      },
      method: 'DELETE',
    }
  );

  if (response.ok) {
    const data = await response.json();

    if (data.success) {
      toast.success('Success!');
      return data;
    } else {
      toast.error(data.message);
      return null;
    }
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};

export const addShelfAPI = async (shelfName: string) => {
  const response = await fetch(
    `https://get-some-books.herokuapp.com/shelves?name=${shelfName}`,
    {
      headers: {
        Authorization: authToken,
      },
      method: 'POST',
    }
  );

  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      toast.success('Success!');
      return data;
    } else {
      toast.error(data.message);
      return null;
    }
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};

export const searchAPI = async (searchTerm: string) => {
  const response = await fetch(
    `https://get-some-books.herokuapp.com/books?title=${searchTerm}`,
    {
      headers: {
        Authorization: authToken,
      },
      method: 'GET',
    }
  );
  if (response.ok) {
    const data = await response.json();

    if (!data.success) {
      toast.error(standardErrMsg);
      return null;
    } else {
      return data as ResultData;
    }
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};

export const bookAPI = async (apiMethod: string, bookID: string) => {
  const response = await fetch(
    `https://get-some-books.herokuapp.com/books/${bookID}/favourite`,
    {
      headers: {
        Authorization: authToken,
      },
      method: apiMethod,
    }
  );

  if (response.ok) {
    const data = await response.json();

    if (data.success) {
      toast.success('Success!');
      return data;
    } else {
      toast.error(data.message);
      return null;
    }
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};
