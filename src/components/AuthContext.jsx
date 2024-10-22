import { createContext, useEffect, useState } from 'react';
import getAuthStatus from '../services/getAuthStatus';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.location.href.includes('192.168.4.94');

  const apiUrl = isMobile
    ? import.meta.env.VITE_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuthStatus = async () => {
      const status = await getAuthStatus(apiUrl);
      status ? setIsAuthenticated(true) : setIsAuthenticated(false);
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuthenticated === true && location.pathname !== '/signin') {
      navigate(location.pathname);
    } else if (isAuthenticated === true) {
      navigate('/home');
    } else if (isAuthenticated === false) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider
      value={{
        apiUrl,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
