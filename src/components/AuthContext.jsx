import { createContext, useState } from 'react';
import Loading from './Loading';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL;

  const authTimer = 1000 * 60 * 60 * 4;

  const signin = (user) => {
    setIsAuthenticated(true);
  };

  const signout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signin,
        signout,
        apiUrl,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
