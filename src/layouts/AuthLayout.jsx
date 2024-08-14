import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';
import { useContext } from 'react';
import Icon from '@mdi/react';
import PawIcon from '../assets/PawIcon';
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

const AuthLayout = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${theme} bg-secondary-2 -z-20 flex min-h-dvh flex-col items-center justify-center gap-12`}
    >
      <div className="relative">
        <PawIcon className="absolute left-1/3 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2" />
        <h1 className="text-primary relative text-8xl tracking-wider">
          Pawprint
        </h1>
      </div>
      <div className="bg-secondary shadow-color flex w-full max-w-lg flex-col items-center gap-8 rounded-xl px-12 py-8">
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
