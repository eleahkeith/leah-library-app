export const shelfURL = (
  baseURL: string,
  shelfID?: string,
  shelfName?: string
) => {
  const formattedName: string | undefined = shelfName
    ? encodeURI(shelfName)
    : undefined;
  if (shelfID) {
    if (formattedName) {
      return `${baseURL}/shelves/${shelfID}?name=${formattedName}`;
    } else {
      return `${baseURL}/shelves/${shelfID}`;
    }
  } else if (formattedName) {
    return `${baseURL}/shelves?name=${formattedName}`;
  } else {
    return `${baseURL}/shelves`;
  }
};

export const bookURL = (baseURL: string, bookID: string, shelfID?: string) => {
  if (shelfID) {
    return `${baseURL}/shelves/${shelfID}/books?bookId=${bookID}`;
  } else {
    return `${baseURL}/book?id=${bookID}`;
  }
};

export const searchURL = (baseURL: string, searchTerm: string) => {
  const formattedSearch: string = encodeURI(searchTerm);
  return `${baseURL}/books?title=${formattedSearch}`;
};

export const registerURL = (baseURL: string) => {
  return `${baseURL}/register`;
};

export const loginURL = (baseURL: string) => {
  return `${baseURL}/login`;
};
