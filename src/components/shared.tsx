import '../app.tsx';

export interface SearchResultsProps {
  toggleSearching: (e: any) => void;
  query: ResultData | undefined | null;
  handleAddFavorite: (e: any) => void;
  children: React.ReactNode;
}

export interface ResultData {
  total: number;
  items: BookResultType[];
  success: boolean;
}

export interface BookResultType {
  author: string;
  googleLink: string | null | undefined;
  id: string;
  imageURL: string | null | undefined;
  pageCount: number;
  publicDomain: boolean | null | undefined;
  publishedDate: string;
  title: string;
}

export interface NewSearchProps {
  newSearch: () => void;
}

export interface FavoritesListProps {
  favorites: ResultData | undefined | null;
  getFavorites: () => void;
  handleDeleteFavorite: (uniqueID: string) => void;
  children: React.ReactNode;
}

export interface OverviewProps {
  showShelves: () => void;
  shelves: ShelfResultData | undefined;
  handleAddShelf: () => void;
  handleType: (e: any) => void;
  handleDeleteShelf: (shelfID: string) => void;
}

export interface ShelfResultData {
  totalItems: number;
  items: ShelfType[];
  success: boolean;
}

export interface ShelfType {
  id: string;
  name: string;
  bookIds: string[];
  books: BookResultType[];
}
