import ListMenuItem from './ListMenuItem';
import { mdiHeart, mdiHeartOutline, mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import Logo from './Logo';
import PawIcon from '../assets/PawIcon';

const NavHeader = (props) => {
  return (
    <nav className="bg-secondary sticky top-0 flex w-dvw items-center justify-between border-b px-3 py-2">
      {props.layoutSize === 'small' ? (
        <Logo className="absolute left-3" textSize="text-3xl" />
      ) : (
        <PawIcon className="absolute left-3 size-12" />
      )}
      <div className="z-10 ml-auto flex items-center gap-3">
        <div className="bg-secondary-2 flex max-w-64 items-center justify-between rounded-lg p-2">
          <input
            className="text-secondary min-w-0 grow border-none bg-transparent text-lg outline-none"
            type="text"
            placeholder="Search"
          />
          <Icon path={mdiCloseCircle} size={1.2} />
        </div>
        <ListMenuItem
          className="w-auto"
          activeItem={props.activeItem}
          icon={
            props.activeItem === 'notifications' ? mdiHeart : mdiHeartOutline
          }
          label="Notifications"
          onClick={() => {
            changeActiveItem('notifications');
            toggleNotificationbar();
          }}
        />
      </div>
    </nav>
  );
};

export default NavHeader;
