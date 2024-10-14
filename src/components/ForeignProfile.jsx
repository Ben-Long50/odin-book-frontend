import { useContext, useEffect, useState } from 'react';
import Profile from './Profile';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import followProfile from '../services/followProfile';
import { AuthContext } from './AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getFollows from '../services/getFollows';
import Loading from './Loading';
import unfollowProfile from '../services/unfollowProfile';

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

      let status = false;

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
      if (!followStatus) {
        await followProfile(activeProfile.id, profile.id, apiUrl);
      } else {
        await unfollowProfile(activeProfile.id, profile.id, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['foreignFollows']);
    },
  });

  useEffect(() => {
    if (follows.refetch) {
      follows.refetch();
    }
  }, [profile, follows.refetch]);

  if (follows.isLoading) {
    return <Loading />;
  }

  return (
    <Profile
      profile={profile}
      followers={follows.data.followers}
      following={follows.data.following}
      followStatus={followStatus}
      setFollowingStatus={setFollowingStatus}
    >
      <Button
        className={`${followStatus && 'opacity-50'} px-3 py-1 text-sm font-semibold`}
        onClick={() => {
          setFollowingStatus.mutate();
        }}
      >
        {followStatus ? 'Unfollow' : 'Follow'}
      </Button>
    </Profile>
  );
};

export default ForeignProfile;
