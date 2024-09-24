import Profile from './Profile';
import { Link } from 'react-router-dom';
import Button from './Button';

const PersonalProfile = () => {
  return (
    <Profile>
      <Link to="edit">
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
