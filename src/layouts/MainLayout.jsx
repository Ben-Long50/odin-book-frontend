import { Outlet, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavHeader from '../components/NavHeader';
import NavFooter from '../components/NavFooter';
import Create from '../components/Create';
import { ThemeContext } from '../components/ThemeContext';
import GlobalProvider from '../components/GlobalContext';
import ScrollBar from 'react-perfect-scrollbar';
import { LayoutContext } from '../components/LayoutContext';

const MainLayout = () => {
  const { layoutSize } = useContext(LayoutContext);
  const [activeItem, setActiveItem] = useState('home');
  const [prevActiveItem, setPrevActiveItem] = useState('');
  const [navbarSize, setNavbarSize] = useState(() => {
    if (layoutSize === 'large') {
      return 'large';
    } else {
      return 'medium';
    }
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [notificationVisibility, setNotificationVisibility] = useState(false);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const container = document.getElementById('portal-root');
    if (container) {
      container.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        changeActiveItem('home');
        break;
      case '/explore':
        changeActiveItem('explore');
        break;
      case '/profile':
        changeActiveItem('profile');
        break;
      default:
        changeActiveItem('');
        break;
    }
  }, [location.pathname]);

  const changeActiveItem = (item) => {
    setNotificationVisibility(false);
    setSearchVisibility(false);
    setMenuVisibility(false);
    if (layoutSize === 'large') {
      setNavbarSize('large');
    }
    if (
      activeItem !== 'search' &&
      activeItem !== 'notifications' &&
      activeItem !== 'menu'
    ) {
      setPrevActiveItem(activeItem);
    }
    setActiveItem(item);
  };

  const closeNavbar = () => {
    setMenuVisibility(false);
    setSearchVisibility(false);
    setNotificationVisibility(false);
    if (layoutSize !== 'xsmall' && layoutSize !== 'small') {
      setNavbarSize('large');
    }
  };

  const toggleCreateOpen = () => {
    if (createOpen) {
      setActiveItem(prevActiveItem);
    }
    setCreateOpen(!createOpen);
  };

  return (
    <GlobalProvider>
      {layoutSize === 'small' || layoutSize === 'xsmall' ? (
        <div
          id="portal-root"
          className={`${theme} main-layout bg-secondary grid min-h-dvh`}
        >
          <NavHeader
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            prevActiveItem={prevActiveItem}
            setPrevActiveItem={setPrevActiveItem}
            menuVisibility={menuVisibility}
            setMenuVisibility={setMenuVisibility}
            searchVisibility={searchVisibility}
            setSearchVisibility={setSearchVisibility}
            notificationVisibility={notificationVisibility}
            setNotificationVisibility={setNotificationVisibility}
          />
          <div
            className="text-primary row-span-1 flex w-full flex-col items-center overflow-x-hidden overflow-y-scroll md:p-6 lg:p-8"
            onClick={closeNavbar}
          >
            <Outlet context={[layoutSize, setActiveItem]} />
          </div>
          <NavFooter
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            prevActiveItem={prevActiveItem}
            setPrevActiveItem={setPrevActiveItem}
            changeActiveItem={changeActiveItem}
            setCreateOpen={setCreateOpen}
            onClick={() => {
              if (
                menuVisibility ||
                searchVisibility ||
                notificationVisibility
              ) {
                closeNavbar();
              }
            }}
          />
          <Create createOpen={createOpen} toggleCreateOpen={toggleCreateOpen} />
        </div>
      ) : (
        // <Scrollbar style={{ width: '100vw', height: '100dvh' }}>
        <div
          id="portal-root"
          className={`${theme} xl:main-layout-xl main-layout-md bg-secondary grid h-dvh`}
        >
          <Navbar
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            prevActiveItem={prevActiveItem}
            setPrevActiveItem={setPrevActiveItem}
            changeActiveItem={changeActiveItem}
            layoutSize={layoutSize}
            navbarSize={navbarSize}
            setNavbarSize={setNavbarSize}
            setCreateOpen={setCreateOpen}
            menuVisibility={menuVisibility}
            setMenuVisibility={setMenuVisibility}
            searchVisibility={searchVisibility}
            setSearchVisibility={setSearchVisibility}
            notificationVisibility={notificationVisibility}
            setNotificationVisibility={setNotificationVisibility}
          />
          <ScrollBar
            id="scrollContainer"
            className="text-primary row-span-1 flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden md:p-6 lg:p-8"
            onClick={closeNavbar}
          >
            <Outlet context={[layoutSize, setActiveItem]} />
          </ScrollBar>
          <Create createOpen={createOpen} toggleCreateOpen={toggleCreateOpen} />
        </div>
        // </Scrollbar>
      )}
    </GlobalProvider>
  );
};

export default MainLayout;
