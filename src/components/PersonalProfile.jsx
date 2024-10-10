import Profile from './Profile';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import getFollows from '../services/getFollows';

const PersonalProfile = () => {
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const follows = useQuery({
    queryKey: ['personalFollows'],
    queryFn: async () => {
      return await getFollows(activeProfile.id, apiUrl);
    },
  });

  if (follows.isPending) {
    return <div>...Loading</div>;
  }

  return (
    <Profile
      profile={activeProfile}
      followers={follows.data.followers}
      following={follows.data.following}
    >
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
