import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import CatIcon from '../assets/CatIcon';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} bg-secondary-2 flex min-h-dvh items-center justify-center`}
    >
      <div className="bg-secondary shadow-color flex max-w-lg grow flex-col items-center gap-8 rounded-xl px-12 py-8">
        {/* <CatIcon className="size-40" /> */}
        <div className="z-10 flex w-full flex-col items-center justify-center">
          <button
            className="text-secondary hover-primary absolute left-0 top-0 m-4 flex items-center gap-4 rounded p-2 text-xl transition duration-300"
            onClick={changeTheme}
          >
            Theme
            <Icon
              path={theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight}
              size={1.2}
            />
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
