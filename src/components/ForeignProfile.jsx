import { useState } from 'react';
import Profile from './Profile';
import Button from './Button';

const ForeignProfile = () => {
  const [following, setFollowing] = useState(false);

  const toggleFollowing = () => {
    setFollowing(!following);
  };

  return (
    <Profile>
      <Button
        className={`${following && 'opacity-50'} px-3 py-1 text-sm font-semibold`}
        onClick={toggleFollowing}
      >
        {following ? 'Unfollow' : 'Follow'}
      </Button>
    </Profile>
  );
};

export default ForeignProfile;
