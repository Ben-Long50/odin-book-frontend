import ListMenuItem from './ListMenuItem';
import { mdiHeart, mdiHeartOutline, mdiMagnify, mdiMenu } from '@mdi/js';
import Logo from './Logo';
import PawIcon from '../assets/PawIcon';
import { useContext, useState } from 'react';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';
import SettingsMenu from './SettingsMenu';
import { GlobalContext } from './GlobalContext';

const NavHeader = (props) => {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const { notifications } = useContext(GlobalContext);

  const toggleSearchbar = () => {
    if (searchVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!searchVisibility) {
      props.setPrevActiveItem(props.activeItem);
      props.setActiveItem('search');
    }
    setNotificationVisibility(false);
    setMenuVisibility(false);
    setSearchVisibility(!searchVisibility);
  };

  const toggleNotificationbar = () => {
    if (notificationVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!notificationVisibility) {
      props.setPrevActiveItem(props.activeItem);
      props.setActiveItem('notifications');
    }
    setSearchVisibility(false);
    setMenuVisibility(false);
    setNotificationVisibility(!notificationVisibility);
  };

  const toggleMenuVisibility = () => {
    if (menuVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!menuVisibility) {
      props.setPrevActiveItem(props.activeItem);
      props.setActiveItem('menu');
    }
    setSearchVisibility(false);
    setNotificationVisibility(false);
    setMenuVisibility(!menuVisibility);
  };

  return (
    <div className="relative">
      <nav className="bg-secondary sticky top-0 z-20 flex w-dvw items-center justify-between border-b px-3 py-2">
        {props.layoutSize === 'small' ? (
          <Logo className="absolute left-3" textSize="text-3xl" />
        ) : (
          <PawIcon className="absolute left-3 size-12" />
        )}
        <div className="z-10 ml-auto flex items-center gap-3">
          <ListMenuItem
            activeItem={props.activeItem}
            icon={mdiMagnify}
            label="Search"
            onClick={() => {
              toggleSearchbar();
            }}
          />
          <ListMenuItem
            className="w-auto"
            activeItem={props.activeItem}
            icon={
              props.activeItem === 'notifications' ? mdiHeart : mdiHeartOutline
            }
            label="Notifications"
            notifications={notifications}
            onClick={() => {
              toggleNotificationbar();
            }}
          />
          <ListMenuItem
            className={`${props.activeItem === 'menu' && 'rotate-180'}`}
            activeItem={props.activeItem}
            icon={mdiMenu}
            label="More"
            onClick={toggleMenuVisibility}
          />
        </div>
      </nav>
      <Searchbar
        className={`timing absolute bottom-0 left-0 z-10 h-auto w-full opacity-0 ${searchVisibility && 'translate-y-full opacity-100'} `}
        layoutSize={props.layoutSize}
        toggleSearchbar={toggleSearchbar}
      />
      <Notificationbar
        className={`timing absolute bottom-0 left-0 z-10 h-auto w-full opacity-0 ${notificationVisibility && 'translate-y-full opacity-100'} `}
        layoutSize={props.layoutSize}
        toggleNotificationbar={toggleNotificationbar}
      />
      <SettingsMenu
        className={`${menuVisibility && 'translate-y-full opacity-100'} timing absolute bottom-0 left-0 z-10 h-auto w-full rounded-none opacity-0`}
        toggleMenuVisibility={toggleMenuVisibility}
      />
    </div>
  );
};

export default NavHeader;
