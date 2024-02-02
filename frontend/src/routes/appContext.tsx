// AppContext.tsx
import React, {createContext, ReactNode, useContext} from 'react';

import {useAppSelector} from '../helper/hooks';

type User = {
  name: string;
};

type AppContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {user, isAuthenticated} = useAppSelector(state => state.user);

  const contextValue: AppContextType = {
    user,
    isAuthenticated,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export {AppProvider, useAppContext};
