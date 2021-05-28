// @refactor - put auth token in one const

import { toast } from 'react-toastify';
import { ResultData, ShelfResultData, GetShelfAPIType } from './shared';

const authToken = process.env.REACT_APP_AUTHORIZATION_TOKEN as string;

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

export const getShelfBooksAPI = async (shelfID: string) => {
  const response = await fetch(
    `https://get-some-books.herokuapp.com/shelves/${shelfID}`,
    {
      headers: {
        Authorization: authToken,
      },
      method: 'GET',
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data as GetShelfAPIType;
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

export const searchAPI = async (searchTerm: string | null) => {
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

export const bookAPI = async (
  apiMethod: string,
  bookID: string | undefined,
  shelfID: string | undefined
) => {
  console.log(bookID, shelfID);
  const response = await fetch(
    `https://get-some-books.herokuapp.com/shelves/${shelfID}/books?bookId=${bookID}`,
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

export const getBookAPI = async (bookID: string) => {
  const response = await fetch(
    `https://get-some-books.herokuapp.com/book?id=${bookID}`,
    {
      headers: {
        Authorization: authToken,
      },
      method: 'GET',
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};

export const registerAPI = async (emailAdd: string) => {
  const email = {
    email: emailAdd,
  };

  const body = JSON.stringify(email);
  const response = await fetch(
    `https://get-some-books-staging.herokuapp.com/register`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: body,
    }
  );

  if (response.ok) {
    const data = await response.json();

    if (data.success) {
      toast.success('Email sent!');
    } else {
      toast.error(standardErrMsg);
    }
  }
};

export const loginAPI = async (emailAddr: string, authCode: string) => {
  const info = { email: emailAddr, token: authCode };
  const body = JSON.stringify(info);

  const response = await fetch(
    `https://get-some-books-staging.herokuapp.com/login`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: body,
    }
  );

  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      toast.success('Login successful!');
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
