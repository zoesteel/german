import { createContext, useContext } from 'react';

const InitializingContext = createContext(false);

export const useInitializing = () => useContext(InitializingContext);

export const InitializingProvider: React.FC<{ initializing: boolean; children: React.ReactNode }> = ({ initializing, children }) => {
  return (
    <InitializingContext.Provider value={initializing}>
      {children}
    </InitializingContext.Provider>
  );
};
