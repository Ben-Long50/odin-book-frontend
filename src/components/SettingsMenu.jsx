import { Link, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import {
  mdiAccountCog,
  mdiAccountSettings,
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
import { useQueryClient } from '@tanstack/react-query';

const SettingsMenu = (props) => {
  const { apiUrl, setIsAuthenticated } = useContext(AuthContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const { activeProfile } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(`${apiUrl}/signout`, {
        method: 'POST',
        credentials: 'include',
      });
      const result = await response.json();
      if (response.ok) {
        queryClient.invalidateQueries(['authStatus']);
        queryClient.clear();

        console.log(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div
      className={`${props.className} timing bg-secondary text-secondary flex min-w-72 flex-col items-start justify-center p-2 text-lg shadow-md md:rounded-xl dark:shadow-gray-950`}
      onClick={props.onClick}
    >
      <Link className="w-full" to="manage">
        <button
          className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
          onClick={props.toggleMenuVisibility}
        >
          <Icon path={mdiAccountSettings} size={1.2} />
          Manage profiles
        </button>
      </Link>
      <Link
        className="w-full"
        to={`/profile/${activeProfile.username}/edit`}
        state={activeProfile}
      >
        <button
          className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
          onClick={props.toggleMenuVisibility}
        >
          <Icon path={mdiCogOutline} size={1.2} />
          Profile settings
        </button>
      </Link>
      <Link className="w-full" to="account/edit" state={activeProfile}>
        <button
          className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-3 text-left"
          onClick={props.toggleMenuVisibility}
        >
          <Icon path={mdiAccountCog} size={1.2} />
          Account settings
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
