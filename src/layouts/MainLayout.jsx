import { Outlet } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NavHeader from '../components/NavHeader';
import NavFooter from '../components/NavFooter';
import { ThemeContext } from '../components/ThemeContext';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState('home');
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

  return (
    <div
      className={`${theme} xl:main-layout-xl md:main-layout-md main-layout bg-secondary grid h-dvh`}
    >
      {layoutSize === 'small' || layoutSize === 'xsmall' ? (
        <>
          <NavHeader layoutSize={layoutSize} setLayoutSize={setLayoutSize} />
          <Outlet />
          <NavFooter
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            layoutSize={layoutSize}
            setLayoutSize={setLayoutSize}
          />
        </>
      ) : (
        <>
          <Navbar
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            layoutSize={layoutSize}
            setLayoutSize={setLayoutSize}
          />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default MainLayout;
