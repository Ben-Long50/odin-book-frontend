import ListMenuItem from './ListMenuItem';
import { mdiHeart, mdiHeartOutline, mdiMagnify, mdiMenu } from '@mdi/js';
import Logo from './Logo';
import PawIcon from '../assets/PawIcon';
import { useContext } from 'react';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';
import SettingsMenu from './SettingsMenu';
import { GlobalContext } from './GlobalContext';

const NavHeader = (props) => {
  const { notifications } = useContext(GlobalContext);

  const toggleSearchbar = () => {
    if (props.searchVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!props.searchVisibility) {
      if (
        props.activeItem !== 'search' &&
        props.activeItem !== 'notifications' &&
        props.activeItem !== 'menu'
      ) {
        props.setPrevActiveItem(props.activeItem);
      }
      props.setActiveItem('search');
    }
    props.setNotificationVisibility(false);
    props.setMenuVisibility(false);
    props.setSearchVisibility(!props.searchVisibility);
  };

  const toggleNotificationbar = () => {
    if (props.notificationVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!props.notificationVisibility) {
      if (
        props.activeItem !== 'search' &&
        props.activeItem !== 'notifications' &&
        props.activeItem !== 'menu'
      ) {
        props.setPrevActiveItem(props.activeItem);
      }
      props.setActiveItem('notifications');
    }
    props.setSearchVisibility(false);
    props.setMenuVisibility(false);
    props.setNotificationVisibility(!props.notificationVisibility);
  };

  const toggleMenuVisibility = () => {
    if (props.menuVisibility) {
      props.setActiveItem(props.prevActiveItem);
    } else if (!props.menuVisibility) {
      if (
        props.activeItem !== 'search' &&
        props.activeItem !== 'notifications' &&
        props.activeItem !== 'menu'
      ) {
        props.setPrevActiveItem(props.activeItem);
      }
      props.setActiveItem('menu');
    }
    props.setSearchVisibility(false);
    props.setNotificationVisibility(false);
    props.setMenuVisibility(!props.menuVisibility);
  };

  return (
    <div className="sticky top-0 z-20">
      <nav className="bg-secondary sticky top-0 z-20 row-span-1 flex w-dvw items-center justify-between border-b px-3 py-2">
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
            className={`${props.activeItem === 'menu' && '-rotate-90'}`}
            activeItem={props.activeItem}
            icon={mdiMenu}
            label="More"
            onClick={toggleMenuVisibility}
          />
        </div>
      </nav>
      <Searchbar
        className={`${props.searchVisibility ? 'translate-y-full opacity-100' : 'shadow-none'} timing } absolute bottom-0 left-0 z-10 h-auto w-full opacity-0`}
        layoutSize={props.layoutSize}
        toggleSearchbar={toggleSearchbar}
      />
      <Notificationbar
        className={`${props.notificationVisibility ? 'translate-y-full opacity-100' : 'shadow-none'} timing absolute bottom-0 left-0 z-10 h-auto w-full opacity-0`}
        layoutSize={props.layoutSize}
        toggleNotificationbar={toggleNotificationbar}
      />
      <SettingsMenu
        className={`${props.menuVisibility ? 'translate-y-full opacity-100' : 'shadow-none'} timing absolute bottom-0 left-0 z-10 h-auto w-full rounded-none opacity-0`}
        toggleMenuVisibility={toggleMenuVisibility}
      />
    </div>
  );
};

export default NavHeader;
