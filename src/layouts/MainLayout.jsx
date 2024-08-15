import { Outlet } from 'react-router-dom';
import { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../components/ThemeContext';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${theme} layout-rows bg-secondary grid grid-rows-1`}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
