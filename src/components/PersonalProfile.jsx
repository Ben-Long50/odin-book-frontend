import Profile from './Profile';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

const PersonalProfile = () => {
  const { activeProfile } = useContext(GlobalContext);

  return (
    <Profile profile={activeProfile}>
      <Link to="edit" state={activeProfile}>
        <Button className="px-3 py-1 text-sm font-semibold">
          Edit profile
        </Button>
      </Link>
      <Link to="bookmarks">
        <Button className="px-3 py-1 text-sm font-semibold">
          View bookmarks
        </Button>
      </Link>
    </Profile>
  );
};

export default PersonalProfile;
