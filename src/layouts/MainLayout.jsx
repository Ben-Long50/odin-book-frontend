import { Outlet } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavHeader from '../components/NavHeader';
import NavFooter from '../components/NavFooter';
import Create from '../components/Create';
import { ThemeContext } from '../components/ThemeContext';
import GlobalProvider from '../components/GlobalContext';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';

const MainLayout = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [prevActiveItem, setPrevActiveItem] = useState('');
  const [layoutSize, setLayoutSize] = useState(() => {
    if (window.innerWidth >= 1280) {
      return 'large';
    } else if (window.innerWidth > 500 && window.innerWidth < 768) {
      return 'small';
    } else if (window.innerWidth <= 500) {
      return 'xsmall';
    } else {
      return 'medium';
    }
  });
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setLayoutSize('large');
      } else if (window.innerWidth > 500 && window.innerWidth < 768) {
        setLayoutSize('small');
      } else if (window.innerWidth <= 500) {
        setLayoutSize('xsmall');
      } else {
        setLayoutSize('medium');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [layoutSize]);

  const closeNavbar = () => {
    setMenuVisibility(false);
    setSearchVisibility(false);
    setNotificationVisibility(false);
    if (layoutSize !== 'xsmall' && layoutSize !== 'small') {
      setNavbarSize('large');
    }
  };

  return (
    <GlobalProvider>
      <div
        id="portal-root"
        className={`${theme} xl:main-layout-xl md:main-layout-md main-layout bg-secondary grid h-dvh bg-fixed`}
      >
        {layoutSize === 'small' || layoutSize === 'xsmall' ? (
          <>
            <NavHeader
              layoutSize={layoutSize}
              setLayoutSize={setLayoutSize}
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
              className="text-primary row-span-1 flex w-full flex-col items-center overflow-y-scroll md:p-6 lg:p-8"
              onClick={closeNavbar}
            >
              <Outlet context={[layoutSize, setActiveItem]} />
            </div>
            <NavFooter
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              prevActiveItem={prevActiveItem}
              setPrevActiveItem={setPrevActiveItem}
              layoutSize={layoutSize}
              setLayoutSize={setLayoutSize}
              setCreateOpen={setCreateOpen}
            />
            <Create createOpen={createOpen} setCreateOpen={setCreateOpen} />
          </>
        ) : (
          <>
            <Navbar
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              prevActiveItem={prevActiveItem}
              setPrevActiveItem={setPrevActiveItem}
              layoutSize={layoutSize}
              setLayoutSize={setLayoutSize}
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
            <PerfectScrollbar
              className="text-primary row-span-1 flex w-full flex-col items-center overflow-y-auto md:p-6 lg:p-8"
              onClick={closeNavbar}
            >
              <Outlet context={[layoutSize, setActiveItem]} />
            </PerfectScrollbar>
            <Create createOpen={createOpen} setCreateOpen={setCreateOpen} />
          </>
        )}
      </div>
    </GlobalProvider>
  );
};

export default MainLayout;
