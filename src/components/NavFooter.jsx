import {
  mdiAccount,
  mdiCompass,
  mdiCompassOutline,
  mdiHomeVariant,
  mdiHomeVariantOutline,
  mdiPlusBox,
  mdiPlusBoxOutline,
} from '@mdi/js';
import { Link } from 'react-router-dom';
import ListMenuItem from './ListMenuItem';
import ProfilePic from './ProfilePic';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

const NavFooter = (props) => {
  const { activeProfile } = useContext(GlobalContext);

  const changeActiveItem = (item) => {
    console.log(props.activeItem);

    props.setActiveItem(item);
  };

  return (
    <nav
      className="bg-secondary sticky bottom-0 row-span-1 flex w-full items-center justify-evenly gap-4 border-t"
      onClick={props.onClick}
    >
      <Link className="w-auto" to="/home">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={
            props.activeItem === 'home' ? mdiHomeVariant : mdiHomeVariantOutline
          }
          label="Home"
        />
      </Link>
      <Link className="w-auto" to="/explore">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={props.activeItem === 'explore' ? mdiCompass : mdiCompassOutline}
          label="Explore"
        />
      </Link>
      <div className="w-auto">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={props.activeItem === 'create' ? mdiPlusBox : mdiPlusBoxOutline}
          label="Create"
          onClick={() => {
            changeActiveItem('create');
            props.setCreateOpen(true);
          }}
        />
      </div>
      <Link className="w-auto" to="/profile">
        <ListMenuItem
          activeItem={props.activeItem}
          icon={mdiAccount}
          label="Profile"
        >
          <ProfilePic
            className="size-10"
            image={activeProfile?.profilePicUrl}
          />
        </ListMenuItem>
      </Link>
    </nav>
  );
};

export default NavFooter;
