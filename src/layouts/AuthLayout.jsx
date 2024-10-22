import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} bg-secondary-2 flex h-dvh flex-col items-center justify-between gap-4 overflow-y-hidden md:justify-center md:gap-16`}
    >
      <button
        className="text-tertiary hover-primary absolute left-0 top-0 m-2 flex items-center gap-4 rounded p-2 text-xl transition duration-300 md:m-4"
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
