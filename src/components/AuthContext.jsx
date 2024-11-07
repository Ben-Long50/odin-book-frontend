import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthenticationQuery from '../hooks/useAuthenticationQuery';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const isMobile = window.location.href.includes('192.168.4.94');

  const apiUrl = isMobile
    ? import.meta.env.VITE_LOCAL_BACKEND_URL
    : import.meta.env.VITE_API_URL;

  const authStatus = useAuthenticationQuery(apiUrl);

  useEffect(() => {
    if (authStatus.isPending) {
      return;
    }
    if (authStatus.isSuccess) {
      console.log('success');

      setIsAuthenticated(true);
    } else {
      console.log('error');
      setIsAuthenticated(false);
    }
  }, [authStatus]);

  useEffect(() => {
    if (isAuthenticated === true) {
      if (location.pathname === '/signin') {
        navigate('/home');
      }
      navigate(location.pathname);
    } else if (isAuthenticated === false) {
      navigate('/overview');
    }
  }, [isAuthenticated]);

  if (authStatus.isLoading || authStatus.isPending) {
    return <span></span>;
  }

  return (
    <AuthContext.Provider
      value={{
        apiUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
