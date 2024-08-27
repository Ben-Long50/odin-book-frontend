import {
  mdiAccount,
  mdiCompass,
  mdiCompassOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiHomeVariant,
  mdiHomeVariantOutline,
  mdiMagnify,
  mdiMenu,
  mdiPlusBox,
  mdiPlusBoxOutline,
} from '@mdi/js';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ListMenuItem from './ListMenuItem';
import { useState } from 'react';
import PawIcon from '../assets/PawIcon';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const changeActiveItem = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="text-primary bg-secondary md:navbar-layout-md sticky top-0 grid h-dvh gap-14 border-r px-5 pb-6 pt-10 md:px-3">
      <PawIcon className="hidden size-12 justify-self-center md:block xl:hidden" />
      <Logo
        className="hidden xl:block"
        iconSize="size-14"
        textSize="text-4xl"
      />
      <div className="flex w-full flex-col items-start justify-start gap-3">
        <Link className="w-full" to="/home">
          <ListMenuItem
            activeItem={activeItem}
            icon={
              activeItem === 'home' ? mdiHomeVariant : mdiHomeVariantOutline
            }
            label="Home"
            onClick={() => changeActiveItem('home')}
            search
          />
        </Link>
        <ListMenuItem
          activeItem={activeItem}
          icon={mdiMagnify}
          label="Search"
          onClick={() => changeActiveItem('search')}
        />
        <Link className="w-full" to="/explore">
          <ListMenuItem
            activeItem={activeItem}
            icon={activeItem === 'explore' ? mdiCompass : mdiCompassOutline}
            label="Explore"
            onClick={() => changeActiveItem('explore')}
          />
        </Link>
        <ListMenuItem
          activeItem={activeItem}
          icon={activeItem === 'notifications' ? mdiHeart : mdiHeartOutline}
          label="Notifications"
          onClick={() => changeActiveItem('notifications')}
        />
        <Link className="w-full" to="/create">
          <ListMenuItem
            activeItem={activeItem}
            icon={activeItem === 'create' ? mdiPlusBox : mdiPlusBoxOutline}
            label="Create"
            onClick={() => changeActiveItem('create')}
          />
        </Link>
        <Link className="w-full" to="/profile">
          <ListMenuItem
            activeItem={activeItem}
            icon={mdiAccount}
            label="Profile"
            onClick={() => changeActiveItem('profile')}
          />
        </Link>
      </div>
      <div className="flex flex-col items-start justify-end">
        <ListMenuItem activeItem={activeItem} icon={mdiMenu} label="More" />
      </div>
    </div>
  );
};

export default Navbar;
