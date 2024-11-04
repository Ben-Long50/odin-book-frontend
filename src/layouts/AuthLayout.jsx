import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} bg-secondary-2 flex min-h-dvh w-dvw flex-col items-center justify-center overflow-y-hidden`}
    >
      <button
        className="hover-primary absolute left-0 top-0 z-10 m-2 flex items-center gap-4 rounded-lg bg-emerald-400 p-2 text-xl text-gray-800 shadow-md shadow-gray-300 transition duration-300 md:m-4 dark:bg-emerald-300 dark:shadow-gray-950"
        onClick={changeTheme}
      >
        <Icon
          path={theme === 'light' ? mdiWeatherSunny : mdiWeatherNight}
          size={1.2}
        />
      </button>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
