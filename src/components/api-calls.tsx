import { toast } from 'react-toastify';
import { ResultData, ShelfResultData, GetShelfAPIType } from './shared';
import {
  shelfURL,
  searchURL,
  bookURL,
  registerURL,
  loginURL,
} from '../utils/urls';

const getAuthToken = () => {
  const authToken = localStorage.getItem('Authorization');

  return authToken;
};
const url = 'https://get-some-books-staging.herokuapp.com';

const standardErrMsg =
  'There was an error processing your request. Please try again later!';

// eventually use to refactor api calls
export const startAPI = (apiType: () => void) => {
  const authToken = getAuthToken();
  if (authToken) {
    apiType();
  } else {
    toast.error('Not authorized to perform this action');
  }
};

export const getShelvesAPI = async () => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(shelfURL(url), {
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
  } else {
    toast.error('not authorized');
  }
};

export const getShelfBooksAPI = async (shelfID: string) => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(shelfURL(url, shelfID), {
      headers: {
        Authorization: authToken,
      },
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data as GetShelfAPIType;
    } else {
      toast.error(standardErrMsg);
      return undefined;
    }
  } else {
    toast.error('not');
  }
};

export const editShelfAPI = async (shelfID: string, shelfName: string) => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(shelfURL(url, shelfID, shelfName), {
      headers: {
        Authorization: authToken,
      },
      method: 'PUT',
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        toast.success('Success!');
        return data;
      } else {
        toast.error(data.message);
        return undefined;
      }
    } else {
      toast.error(standardErrMsg);
      return undefined;
    }
  }
};

export const deleteShelfAPI = async (shelfID: string) => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(shelfURL(url, shelfID), {
      headers: {
        Authorization: authToken,
      },
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        toast.success('Success!');
        return data;
      } else {
        toast.error(data.message);
        return undefined;
      }
    } else {
      toast.error(standardErrMsg);
      return undefined;
    }
  }
};

export const addShelfAPI = async (shelfName: string) => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(shelfURL(url, undefined, shelfName), {
      headers: {
        Authorization: authToken,
      },
      method: 'POST',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        toast.success('Success!');
        return data;
      } else {
        toast.error(data.message);
        return undefined;
      }
    } else {
      toast.error(standardErrMsg);
      return undefined;
    }
  }
};

export const searchAPI = async (searchTerm: string) => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(searchURL(url, searchTerm), {
      headers: {
        Authorization: authToken,
      },
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();

      if (!data.success) {
        toast.error(standardErrMsg);
        return undefined;
      } else {
        return data as ResultData;
      }
    } else {
      toast.error(standardErrMsg);
      return undefined;
    }
  }
};

export const bookAPI = async (
  apiMethod: string,
  bookID: string,
  shelfID: string
) => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(bookURL(url, bookID, shelfID), {
      headers: {
        Authorization: authToken,
      },
      method: apiMethod,
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success) {
        toast.success('Success!');
        return data;
      } else {
        toast.error(data.message);
        return undefined;
      }
    } else {
      toast.error(standardErrMsg);
      return undefined;
    }
  }
};

export const getBookAPI = async (bookID: string) => {
  const authToken = getAuthToken();
  if (authToken) {
    const response = await fetch(bookURL(url, bookID, undefined), {
      headers: {
        Authorization: authToken,
      },
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      toast.error(standardErrMsg);
      return undefined;
    }
  }
};

export const registerAPI = async (emailAdd: string) => {
  const email = {
    email: emailAdd,
  };

  const body = JSON.stringify(email);
  const response = await fetch(registerURL(url), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: body,
  });

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

  const response = await fetch(loginURL(url), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: body,
  });

  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      toast.success('Login successful!');
      return data;
    } else {
      toast.error(data.message);
      return undefined;
    }
  } else {
    toast.error(standardErrMsg);
    return undefined;
  }
};
