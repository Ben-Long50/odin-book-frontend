import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} bg-secondary-2 flex h-dvh flex-col items-center justify-center gap-16 overflow-y-hidden`}
    >
      <button
        className="text-secondary hover-primary absolute left-0 top-0 m-4 flex items-center gap-4 rounded p-2 text-xl transition duration-300"
        onClick={changeTheme}
      >
        Theme
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
