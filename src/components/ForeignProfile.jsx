import { useContext, useState } from 'react';
import Profile from './Profile';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import followProfile from '../services/followProfile';
import { AuthContext } from './AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getFollows from '../services/getFollows';

const ForeignProfile = () => {
  const [followStatus, setFollowStatus] = useState(false);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const location = useLocation();
  const profile = location.state;

  const follows = useQuery({
    queryKey: ['foreignFollows'],
    queryFn: async () => {
      const results = await getFollows(profile.id, apiUrl);

      let status = followStatus;

      results.followers.forEach((follower) => {
        if (follower.followerId === activeProfile.id) {
          status = true;
        }
      });
      setFollowStatus(status);
      return results;
    },
  });

  const setFollowingStatus = useMutation({
    mutationFn: async () => {
      await followProfile(activeProfile.id, profile.id, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['foreignFollows']);
    },
  });

  if (follows.isPending) {
    return <div>...Loading</div>;
  }

  return (
    <Profile
      profile={profile}
      followers={follows.data.followers}
      following={follows.data.following}
      followStats={followStatus}
      setFollowingStatus={setFollowingStatus}
    >
      <Button
        className={`${followStatus && 'opacity-50'} px-3 py-1 text-sm font-semibold`}
        onClick={() => {
          setFollowingStatus.mutate();
          console.log(followStatus);
        }}
      >
        {followStatus ? 'Unfollow' : 'Follow'}
      </Button>
    </Profile>
  );
};

export default ForeignProfile;
