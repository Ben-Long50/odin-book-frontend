import Profile from './Profile';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';

const PersonalProfile = () => {
  const [profile, setProfile] = useState({
    username: 'Kitty_da_TA',
    posts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    petName: 'Kitty',
    species: 'Cat',
    breed: 'Turkish Angora',
    bio: "I'm just a little Turkish Angora!",
  });

  return (
    <Profile profile={profile}>
      <Link to="edit" state={profile}>
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
