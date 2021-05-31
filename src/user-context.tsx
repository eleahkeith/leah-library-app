import { createContext } from 'react';

interface ContextProps {
  loggedIn: boolean | undefined;
  setLoggedIn: (state: boolean) => void;
}

export const UserContext = createContext<ContextProps>({
  loggedIn: false,
  setLoggedIn: () => null,
});
