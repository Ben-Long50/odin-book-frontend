import { Link, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiAccountCog,
  mdiBookmarkOutline,
  mdiCogOutline,
  mdiLogout,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@mdi/js';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';

const SettingsMenu = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const { activeProfile } = useContext(GlobalContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(`${apiUrl}/signout`, {
        method: 'POST',
        credentials: 'include',
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        navigate('/signin');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div
      className={`${props.className} timing shadow-medium bg-secondary text-secondary flex flex-col items-start justify-center rounded-xl p-2 text-lg`}
    >
      <Link className="w-full" to="manage">
        <button
          className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
          onClick={props.toggleMenuVisibility}
        >
          <Icon path={mdiAccountCog} size={1.2} />
          Manage profiles
        </button>
      </Link>
      <Link className="w-full" to="profile/edit" state={activeProfile}>
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
          onClick={() => {
            props.toggleMenuVisibility();
            logout();
          }}
        >
          <Icon path={mdiLogout} size={1.2} />
          Log out
        </button>
      </Link>
    </div>
  );
};

export default SettingsMenu;
