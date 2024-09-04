import {
  mdiAccount,
  mdiCompass,
  mdiCompassOutline,
  mdiHeart,
  mdiHeartOutline,
  mdiHomeVariant,
  mdiHomeVariantOutline,
  mdiMagnify,
  mdiPlusBox,
  mdiPlusBoxOutline,
} from '@mdi/js';
import { Link } from 'react-router-dom';
import ListMenuItem from './ListMenuItem';

const NavFooter = (props) => {
  const changeActiveItem = (item) => {
    props.setActiveItem(item);
  };

  return (
    <nav className="bg-secondary sticky bottom-0 flex w-dvw items-center justify-evenly gap-4 border-t p-1">
      <Link className="w-auto" to="/home">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={
            props.activeItem === 'home' ? mdiHomeVariant : mdiHomeVariantOutline
          }
          label="Home"
          onClick={() => changeActiveItem('home')}
        />
      </Link>
      <Link className="w-auto" to="/explore">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={props.activeItem === 'explore' ? mdiCompass : mdiCompassOutline}
          label="Explore"
          onClick={() => changeActiveItem('explore')}
        />
      </Link>
      <Link className="w-auto" to="/create">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={props.activeItem === 'create' ? mdiPlusBox : mdiPlusBoxOutline}
          label="Create"
          onClick={() => changeActiveItem('create')}
        />
      </Link>
      <Link className="w-auto" to="/profile">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={mdiAccount}
          label="Profile"
          onClick={() => changeActiveItem('profile')}
        />
      </Link>
    </nav>
  );
};

export default NavFooter;
