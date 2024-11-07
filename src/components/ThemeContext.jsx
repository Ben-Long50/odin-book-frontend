import { createContext, useEffect, useState } from 'react';
import PawIcon from '../assets/PawIcon';
import useServerStatusQuery from '../hooks/useServerStatusQuery';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [serverRunning, setServerRunning] = useState(
    JSON.parse(localStorage.getItem('serverStatus')) || false,
  );

  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        localStorage.setItem('theme', 'dark');
        return 'dark';
      } else {
        localStorage.setItem('theme', 'light');
        return 'light';
      }
    }
  });

  const serverStatus = useServerStatusQuery(setServerRunning);

  useEffect(() => {
    if (serverStatus.isSuccess) {
      localStorage.setItem('serverStatus', JSON.stringify(serverStatus.data));
      setServerRunning(true);
    }
  }, [serverStatus.isSuccess]);

  const changeTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  if (!serverRunning) {
    return (
      <div className="h-dvh w-dvw">
        <div
          className={`${theme} bg-secondary flex h-full w-full flex-col items-center justify-center gap-4 px-4 md:gap-8`}
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
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
