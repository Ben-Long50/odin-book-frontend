import { Outlet } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../components/ThemeContext';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [layoutSize, setLayoutSize] = useState(() => {
    if (window.innerWidth >= 1280) {
      return 'large';
    } else if (window.innerWidth < 768) {
      return 'small';
    } else {
      return 'medium';
    }
  });
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setLayoutSize('large');
      } else if (window.innerWidth < 768) {
        setLayoutSize('small');
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
      className={`${theme} xl:main-layout-xl md:main-layout-md bg-secondary grid h-dvh`}
    >
      <Navbar layoutSize={layoutSize} setLayoutSize={setLayoutSize} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
