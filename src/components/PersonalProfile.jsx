import Profile from './Profile';
import { Link, useOutletContext } from 'react-router-dom';
import Button from './Button';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import getFollows from '../services/getFollows';
import { mdiBookmarkOutline, mdiSquareEditOutline } from '@mdi/js';
import Icon from '@mdi/react';

const PersonalProfile = () => {
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const [layoutSize] = useOutletContext();

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
      followStatus={true}
    >
      <Link to="edit" state={activeProfile}>
        <Button className="px-3 py-1 text-sm font-semibold">
          {layoutSize !== 'xsmall' ? (
            <p>Edit profile</p>
          ) : (
            <Icon path={mdiSquareEditOutline} size={1} />
          )}
        </Button>
      </Link>
      <Link to="bookmarks">
        <Button className="px-3 py-1 text-sm font-semibold">
          {layoutSize !== 'xsmall' ? (
            <p>View Bookmarks</p>
          ) : (
            <Icon path={mdiBookmarkOutline} size={1} />
          )}
        </Button>
      </Link>
    </Profile>
  );
};

export default PersonalProfile;
