import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiBookmarkOutline,
  mdiCogOutline,
  mdiLogout,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@mdi/js';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const SettingsMenu = (props) => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div
      className={`${props.className} timing shadow-medium bg-secondary text-secondary flex flex-col items-start justify-center rounded-xl p-2 text-lg`}
    >
      <Link className="w-full" to="profile/edit">
        <button
          className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
          onClick={props.toggleMenuVisibility}
        >
          <Icon path={mdiCogOutline} size={1.2} />
          Profile settings
        </button>
      </Link>
      <Link className="w-full" to="profile/bookmarks">
        <button
          className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
          onClick={props.toggleMenuVisibility}
        >
          <Icon path={mdiBookmarkOutline} size={1.2} />
          Bookmarks
        </button>
      </Link>
      <button
        className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
        onClick={() => {
          props.toggleMenuVisibility();
          changeTheme();
        }}
      >
        <Icon
          path={theme === 'light' ? mdiWeatherSunny : mdiWeatherNight}
          size={1.2}
        />
        Change theme
      </button>
      <Link className="w-full" to="signin">
        <button
          className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
          onClick={props.toggleMenuVisibility}
        >
          <Icon path={mdiLogout} size={1.2} />
          Log out
        </button>
      </Link>
    </div>
  );
};

export default SettingsMenu;
