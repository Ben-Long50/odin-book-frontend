import ListMenuItem from './ListMenuItem';
import { mdiHeart, mdiHeartOutline, mdiMagnify } from '@mdi/js';
import Logo from './Logo';
import PawIcon from '../assets/PawIcon';
import { useState } from 'react';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';

const NavHeader = (props) => {
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [notificationVisibility, setNotificationVisibility] = useState(false);

  const toggleSearchbar = () => {
    setNotificationVisibility(false);
    setSearchVisibility(!searchVisibility);
  };

  const toggleNotificationbar = () => {
    setSearchVisibility(false);
    setNotificationVisibility(!notificationVisibility);
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
              props.setActiveItem('search');
            }}
          />
          <ListMenuItem
            className="w-auto"
            activeItem={props.activeItem}
            icon={
              props.activeItem === 'notifications' ? mdiHeart : mdiHeartOutline
            }
            label="Notifications"
            onClick={() => {
              toggleNotificationbar();
              props.setActiveItem('notifications');
            }}
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
      />
    </div>
  );
};

export default NavHeader;
