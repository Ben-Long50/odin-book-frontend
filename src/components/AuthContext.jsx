import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthenticationQuery from '../hooks/useAuthenticationQuery';
import PawIcon from '../assets/PawIcon';
import { ThemeContext } from './ThemeContext';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
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
    return (
      <div className="h-dvh w-dvw">
        <div
          className={`${theme} bg-secondary-2 flex h-full w-full flex-col items-center justify-center gap-4 px-4 md:gap-8`}
        >
          <h1 className="text-primary font-logo text-4xl">Please wait</h1>
          <p className="text-tertiary text-xl">
            The server is booting up after a period of inactivity
          </p>
          <div className="flex">
            <div className="pawprint-top-1">
              <PawIcon className="size-16 translate-x-1/2 rotate-[78deg]" />
            </div>
            <div className="pawprint-top-2 opacity-0">
              <PawIcon className="size-16 -translate-x-1/2 rotate-[78deg]" />
            </div>
          </div>
          <div className="flex -translate-y-16">
            <div className="pawprint-bottom-1 opacity-0">
              <PawIcon className="size-16 translate-x-1/2 rotate-[78deg]" />
            </div>
            <div className="pawprint-bottom-2 opacity-0">
              <PawIcon className="size-16 -translate-x-1/2 rotate-[78deg]" />
            </div>
          </div>
        </div>
      </div>
    );
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
