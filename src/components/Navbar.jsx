import {
  mdiAccount,
  mdiCogOutline,
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
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ListMenuItem from './ListMenuItem';
import { useState } from 'react';
import PawIcon from '../assets/PawIcon';
import Searchbar from './Searchbar';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);

  const changeActiveItem = (item) => {
    setActiveItem(item);
  };

  const toggleMenuVisibility = () => {
    setMenuVisibility(!menuVisibility);
  };

  const toggleSearchbar = () => {
    setSearchVisibility(!searchVisibility);
  };

  return (
    <div className="relative">
      <div className="text-primary bg-secondary md:navbar-layout-md sticky top-0 z-20 grid h-dvh gap-14 border-r px-5 pb-6 pt-10 md:px-3">
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
            onClick={() => {
              changeActiveItem('search');
              toggleSearchbar();
            }}
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
        <div className="relative flex flex-col items-start justify-end">
          <ListMenuItem
            activeItem={activeItem}
            icon={mdiMenu}
            label="More"
            onClick={toggleMenuVisibility}
          />
          <div
            className={` ${menuVisibility ? 'menu-load block' : 'menu-deload hidden'} shadow-medium bg-secondary text-secondary absolute flex w-64 -translate-y-1/2 flex-col items-start justify-center rounded-xl border border-gray-100 p-2 text-lg xl:w-full dark:border-gray-950`}
          >
            <button className="hover:bg-secondary-2 flex w-full items-center justify-start gap-3 rounded-lg p-4 text-left">
              <Icon path={mdiCogOutline} size={1.3} />
              <h2>Settings</h2>
            </button>
            <button className="hover:bg-secondary-2 w-full rounded-lg p-4 text-left">
              Log out
            </button>
          </div>
        </div>
      </div>
      <Searchbar
        className={`${searchVisibility ? 'translate-x-full' : 'translate-x-0'} timing absolute right-0 top-0 z-10 transform`}
      />
    </div>
  );
};

export default Navbar;
