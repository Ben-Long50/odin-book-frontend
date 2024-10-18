import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const isMobile = window.location.href.includes('192.168.4.94');

  const apiUrl = isMobile
    ? import.meta.env.VITE_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_URL;

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
