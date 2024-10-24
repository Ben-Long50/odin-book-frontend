import { Outlet } from 'react-router-dom';
import { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import NavHeader from '../components/NavHeader';
import NavFooter from '../components/NavFooter';
import Create from '../components/Create';
import { ThemeContext } from '../components/ThemeContext';
import GlobalProvider from '../components/GlobalContext';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Scrollbar } from 'react-scrollbars-custom';
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

  const closeNavbar = () => {
    setMenuVisibility(false);
    setSearchVisibility(false);
    setNotificationVisibility(false);
    setActiveItem(prevActiveItem);
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
