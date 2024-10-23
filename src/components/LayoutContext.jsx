import { createContext, useEffect, useState } from 'react';

export const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
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
    <LayoutContext.Provider value={{ layoutSize }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
