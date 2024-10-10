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
import { useEffect, useState, useRef } from 'react';
import PawIcon from '../assets/PawIcon';
import Searchbar from './Searchbar';
import Notificationbar from './Notificationbar';
import SettingsMenu from './SettingsMenu';

const Navbar = (props) => {
  const [navbarSize, setNavbarSize] = useState(() => {
    if (props.layoutSize === 'large') {
      return 'large';
    } else {
      return 'medium';
    }
  });
  const [navWidth, setNavWidth] = useState(85);
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
      setSearchVisibility(false);
      setNotificationVisibility(false);
      setMenuVisibility(false);
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
    if (props.activeItem !== 'search' && props.activeItem !== 'notifications') {
      setPrevActiveItem(props.activeItem);
    }
    props.setActiveItem(item);
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
      props.setActiveItem(prevActiveItem);
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
      props.setActiveItem(prevActiveItem);
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
                ? 'w-0 -translate-x-32 pl-0 opacity-0'
                : 'w-[150px] pl-4'
            }`}
            textSize="text-4xl"
          />
          <PawIcon
            className={`timing size-12 h-14 justify-self-center ${props.layoutSize === 'medium' || navbarSize === 'medium' ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <div className="flex w-full flex-col items-start justify-start gap-4">
          <Link className="w-full" to="/home">
            <ListMenuItem
              activeItem={props.activeItem}
              icon={
                props.activeItem === 'home'
                  ? mdiHomeVariant
                  : mdiHomeVariantOutline
              }
              label="Home"
              onClick={() => changeActiveItem('home')}
              navbarSize={navbarSize}
            />
          </Link>
          <ListMenuItem
            activeItem={props.activeItem}
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
              activeItem={props.activeItem}
              icon={
                props.activeItem === 'explore' ? mdiCompass : mdiCompassOutline
              }
              label="Explore"
              onClick={() => changeActiveItem('explore')}
              navbarSize={navbarSize}
            />
          </Link>
          <ListMenuItem
            activeItem={props.activeItem}
            icon={
              props.activeItem === 'notifications' ? mdiHeart : mdiHeartOutline
            }
            label="Notifications"
            onClick={() => {
              changeActiveItem('notifications');
              toggleNotificationbar();
            }}
            navbarSize={navbarSize}
          />
          <ListMenuItem
            activeItem={props.activeItem}
            icon={
              props.activeItem === 'create' ? mdiPlusBox : mdiPlusBoxOutline
            }
            label="Create"
            onClick={() => {
              changeActiveItem('create');
              props.setCreateOpen(true);
            }}
            navbarSize={navbarSize}
          />
          <Link className="w-full" to="/profile">
            <ListMenuItem
              activeItem={props.activeItem}
              icon={mdiAccount}
              label="Profile"
              onClick={() => changeActiveItem('profile')}
              navbarSize={navbarSize}
            />
          </Link>
        </div>
        <div className="relative flex flex-col items-start justify-end">
          <ListMenuItem
            activeItem={props.activeItem}
            icon={mdiMenu}
            label="More"
            onClick={toggleMenuVisibility}
            navbarSize={navbarSize}
          />
          <SettingsMenu
            className={`${menuVisibility ? 'opacity-100' : '-translate-x-full opacity-0'} absolute bottom-115 left-0`}
            toggleMenuVisibility={toggleMenuVisibility}
          />
        </div>
      </div>
      <Searchbar
        className={`${searchVisibility ? 'opacity-100' : '-translate-x-full opacity-50'} timing absolute left-0 top-0 z-10`}
        style={{
          transform:
            searchVisibility &&
            `translateX(${navRef.current ? navWidth + 'px' : '0px'})`,
        }}
        toggleSearchbar={toggleSearchbar}
      />
      <Notificationbar
        className={`${notificationVisibility ? 'opacity-100' : '-translate-x-full opacity-50'} timing absolute left-0 top-0 z-10`}
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
