import { useContext, useEffect, useState } from 'react';
import Profile from './Profile';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import followProfile from '../services/followProfile';
import { AuthContext } from './AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import unfollowProfile from '../services/unfollowProfile';
import getProfile from '../services/getProfile';
import Loading from './Loading';

const ForeignProfile = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followStatus, setFollowStatus] = useState(false);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile, activeFollowing } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const location = useLocation();
  const profileId = location.state;

  const profile = useQuery({
    queryKey: ['foreignProfile'],
    queryFn: async () => {
      console.log(profileId);

      const profile = await getProfile(profileId, apiUrl);
      const followers = profile.followers.map(
        (follower) => follower.followerId,
      );
      const following = profile.following.map(
        (following) => following.profileId,
      );
      setFollowers(followers);
      setFollowing(following);

      return profile;
    },
  });

  const setFollowingStatus = useMutation({
    mutationFn: async () => {
      if (!followStatus) {
        await followProfile(activeProfile.id, profileId, apiUrl);
      } else {
        await unfollowProfile(activeProfile.id, profileId, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['activeProfile', 'foreignProfile']);
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries('foreignProfile');
  }, [location.pathname]);

  useEffect(() => {
    if (activeFollowing.includes(profileId)) {
      setFollowStatus(true);
    } else {
      setFollowStatus(false);
    }
  }, [activeFollowing, profile]);

  if (profile.isLoading) {
    return <Loading />;
  }

  return (
    <Profile
      profile={profile.data}
      followers={followers}
      following={following}
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
