// @refactor - put auth token in one const

import { toast } from 'react-toastify';
import { ResultData, ShelfResultData, GetShelfAPIType } from './shared';

const authToken = localStorage.getItem('Authorization');
const url = 'https://get-some-books-staging.herokuapp.com';

const standardErrMsg =
  'There was an error processing your request. Please try again later!';

export const startAPI = (apiType: () => void) => {
  if (authToken) {
    apiType();
  } else {
    toast.error('Not authorized to perform this action');
  }
};

export const getShelvesAPI = async () => {
  if (authToken) {
    const response = await fetch(`${url}/shelves`, {
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
  if (authToken) {
    const response = await fetch(`${url}/shelves/${shelfID}`, {
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
  if (authToken) {
    const response = await fetch(
      `${url}/shelves/${shelfID}?name=${shelfName}`,
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
  }
};

export const deleteShelfAPI = async (shelfID: string) => {
  if (authToken) {
    const response = await fetch(`${url}/shelves/${shelfID}`, {
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
        return null;
      }
    } else {
      toast.error(standardErrMsg);
      return null;
    }
  }
};

export const addShelfAPI = async (shelfName: string) => {
  if (authToken) {
    const response = await fetch(`${url}/shelves?name=${shelfName}`, {
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
        return null;
      }
    } else {
      toast.error(standardErrMsg);
      return null;
    }
  }
};

export const searchAPI = async (searchTerm: string | null) => {
  if (authToken) {
    const response = await fetch(`${url}/books?title=${searchTerm}`, {
      headers: {
        Authorization: authToken,
      },
      method: 'GET',
    });
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
  }
};

export const bookAPI = async (
  apiMethod: string,
  bookID: string | undefined,
  shelfID: string | undefined
) => {
  if (authToken) {
    const response = await fetch(
      `${url}/shelves/${shelfID}/books?bookId=${bookID}`,
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
  }
};

export const getBookAPI = async (bookID: string) => {
  if (authToken) {
    const response = await fetch(`${url}/book?id=${bookID}`, {
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
      return null;
    }
  }
};

export const registerAPI = async (emailAdd: string) => {
  const email = {
    email: emailAdd,
  };

  const body = JSON.stringify(email);
  const response = await fetch(`${url}/register`, {
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

  const response = await fetch(`${url}/login`, {
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
      return null;
    }
  } else {
    toast.error(standardErrMsg);
    return null;
  }
};
