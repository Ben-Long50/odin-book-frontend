import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Loading = (props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${theme} flex h-full flex-col items-center justify-center bg-transparent md:gap-8`}
    >
      <Icon
        className={`text-primary spin ${props.className}`}
        path={mdiLoading}
        size={props.size || 5}
      />
    </div>
  );
};

export default Loading;
