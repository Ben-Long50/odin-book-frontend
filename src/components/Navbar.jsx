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
import { useEffect, useState, useRef } from 'react';
import PawIcon from '../assets/PawIcon';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';

const Navbar = (props) => {
  const [activeItem, setActiveItem] = useState('home');
  const [navbarSize, setNavbarSize] = useState(() => {
    if (props.layoutSize === 'large') {
      return 'large';
    } else {
      return 'medium';
    }
  });
  const [navWidth, setNavWidth] = useState(null);
  const [prevActiveItem, setPrevActiveItem] = useState('');
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [notificationVisibility, setNotificationVisibility] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setNavbarSize('large');
      } else if (window.innerWidth > 768 && window.innerWidth < 1280) {
        setNavbarSize('medium');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const changeActiveItem = (item) => {
    setNotificationVisibility(false);
    setSearchVisibility(false);
    if (props.layoutSize === 'large') {
      setNavbarSize('large');
    }
    if (activeItem !== 'search' && activeItem !== 'notifications') {
      setPrevActiveItem(activeItem);
    }
    setActiveItem(item);
  };

  const toggleMenuVisibility = () => {
    setMenuVisibility(!menuVisibility);
  };

  const toggleSearchbar = () => {
    if (navbarSize === 'medium') {
      setNavWidth(navRef.current.offsetWidth);
    }
    if (searchVisibility) {
      if (props.layoutSize === 'large') {
        setNavbarSize('large');
      }
      setActiveItem(prevActiveItem);
    } else {
      setNavbarSize('medium');
    }
    if (notificationVisibility) {
      setNotificationVisibility(false);
    }
    setSearchVisibility(!searchVisibility);
  };

  const toggleNotificationbar = () => {
    if (navbarSize === 'medium') {
      setNavWidth(navRef.current.offsetWidth);
    }
    if (notificationVisibility) {
      if (props.layoutSize === 'large') {
        setNavbarSize('large');
      }
      setActiveItem(prevActiveItem);
    } else {
      setNavbarSize('medium');
    }
    if (searchVisibility) {
      setSearchVisibility(false);
    }
    setNotificationVisibility(!notificationVisibility);
  };

  return (
    <div className="relative flex w-full">
      <div
        className={`${navbarSize === 'large' && 'grow'} timing text-primary bg-secondary md:navbar-layout-md sticky top-0 z-20 grid h-dvh gap-14 border-r px-4 pb-6 pt-10`}
        ref={navRef}
      >
        <div className="flex">
          <Logo
            className={`timing h-14 ${
              navbarSize === 'medium'
                ? 'w-0 -translate-x-32 opacity-0'
                : 'w-[150px]'
            }`}
            iconSize="size-12"
            textSize="text-4xl"
          />
          <PawIcon
            className={`timing size-12 h-14 justify-self-center ${props.layoutSize === 'medium' || navbarSize === 'medium' ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-4">
          <Link className="w-full" to="/home">
            <ListMenuItem
              activeItem={activeItem}
              icon={
                activeItem === 'home' ? mdiHomeVariant : mdiHomeVariantOutline
              }
              label="Home"
              onClick={() => changeActiveItem('home')}
              navbarSize={navbarSize}
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
            navbarSize={navbarSize}
          />
          <Link className="w-full" to="/explore">
            <ListMenuItem
              activeItem={activeItem}
              icon={activeItem === 'explore' ? mdiCompass : mdiCompassOutline}
              label="Explore"
              onClick={() => changeActiveItem('explore')}
              navbarSize={navbarSize}
            />
          </Link>
          <ListMenuItem
            activeItem={activeItem}
            icon={activeItem === 'notifications' ? mdiHeart : mdiHeartOutline}
            label="Notifications"
            onClick={() => {
              changeActiveItem('notifications');
              toggleNotificationbar();
            }}
            navbarSize={navbarSize}
          />
          <Link className="w-full" to="/create">
            <ListMenuItem
              activeItem={activeItem}
              icon={activeItem === 'create' ? mdiPlusBox : mdiPlusBoxOutline}
              label="Create"
              onClick={() => changeActiveItem('create')}
              navbarSize={navbarSize}
            />
          </Link>
          <Link className="w-full" to="/profile">
            <ListMenuItem
              activeItem={activeItem}
              icon={mdiAccount}
              label="Profile"
              onClick={() => changeActiveItem('profile')}
              navbarSize={navbarSize}
            />
          </Link>
        </div>
        <div className="relative flex flex-col items-start justify-end">
          <ListMenuItem
            activeItem={activeItem}
            icon={mdiMenu}
            label="More"
            onClick={toggleMenuVisibility}
            navbarSize={navbarSize}
          />
          <div
            className={` ${menuVisibility ? 'menu-load' : 'menu-deload hidden'} shadow-medium bg-secondary text-secondary bottom-115 absolute left-0 box-border flex flex-col items-start justify-center rounded-xl border border-gray-100 p-2 text-lg dark:border-gray-950`}
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
        className={`${searchVisibility ? 'left-0 opacity-100' : '-translate-x-full opacity-0'} timing absolute top-0 z-10`}
        style={{
          transform:
            searchVisibility &&
            `translateX(${navRef.current ? navWidth + 'px' : '0px'})`,
        }}
      />
      <Notificationbar
        className={`${notificationVisibility ? 'left-0 opacity-100' : '-translate-x-full opacity-0'} timing absolute top-0 z-10`}
        style={{
          transform:
            notificationVisibility &&
            `translateX(${navRef.current ? navWidth + 'px' : '0px'})`,
        }}
      />
    </div>
  );
};

export default Navbar;
