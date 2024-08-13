import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Loading = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`${theme} grid h-full w-full place-content-center`}>
      <Icon className="text-primary spin" path={mdiLoading} size={5} />
    </div>
  );
};

export default Loading;
