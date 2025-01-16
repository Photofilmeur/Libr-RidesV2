import React, { createContext, useState } from 'react';
import { isAuthenticated as checkAuth } from '../components/Account/authAPI';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
