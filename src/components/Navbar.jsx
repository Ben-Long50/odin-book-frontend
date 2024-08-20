import { mdiAccount, mdiHomeVariant, mdiImagePlus, mdiMagnify } from '@mdi/js';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ListMenuItem from './ListMenuItem';
import { useState } from 'react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const changeActiveItem = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="text-primary bg-secondary-2 shadow-color shadow-normal sticky top-0 grid w-full grid-cols-3 items-center pl-3">
      <div className="flex items-center">
        <Logo iconSize="size-14" textSize="text-4xl" />
      </div>
      <div className="flex self-center justify-self-center">
        <Link to="/home">
          <ListMenuItem
            className="h-16 w-28"
            activeItem={activeItem}
            icon={mdiHomeVariant}
            label="home"
            onClick={() => changeActiveItem('home')}
          />
        </Link>
        <Link to="/search">
          <ListMenuItem
            className="h-16 w-28"
            activeItem={activeItem}
            icon={mdiMagnify}
            label="search"
            onClick={() => changeActiveItem('search')}
          />
        </Link>
        <Link to="/create">
          <ListMenuItem
            className="h-16 w-28"
            activeItem={activeItem}
            icon={mdiImagePlus}
            label="create"
            onClick={() => changeActiveItem('create')}
          />
        </Link>
      </div>
      <Link className="justify-self-end" to="/profile">
        <ListMenuItem
          className="h-16 w-28"
          activeItem={activeItem}
          icon={mdiAccount}
          label="profile"
          onClick={() => changeActiveItem('profile')}
        />
      </Link>
    </div>
  );
};

export default Navbar;
