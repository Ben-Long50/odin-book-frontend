import { useContext, useEffect, useState } from 'react';
import Profile from './Profile';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import Loading from './Loading';
import useForeignProfileQuery from '../hooks/useForeignProfileQuery';
import useFollowStatusMutation from '../hooks/useFollowingStatusMutation';
import useFollowStatusQuery from '../hooks/useFollowStatusQuery';

const ForeignProfile = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile, activeFollowing } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const location = useLocation();
  const profileId = location.state;

  const profile = useForeignProfileQuery(profileId, apiUrl);

  const followStatus = useFollowStatusQuery(
    activeProfile.id,
    profileId,
    apiUrl,
    true,
  );

  useEffect(() => {
    if (profile.data) {
      const followers = profile.data.followers.map(
        (follower) => follower.followerId,
      );
      const following = profile.data.following.map(
        (following) => following.profileId,
      );
      setFollowers(followers);
      setFollowing(following);
    }
  }, [profile.data, activeFollowing, profileId]);

  const setFollowingStatus = useFollowStatusMutation(
    activeProfile.id,
    profileId,
    followStatus.data,
    apiUrl,
  );

  useEffect(() => {
    if (profile.refetch) {
      profile.refetch();
    }
  }, [location, profileId]);

  useEffect(() => {
    queryClient.invalidateQueries('foreignProfile');
  }, [location.pathname]);

  if (profile.isLoading) {
    return <Loading />;
  }

  return (
    <Profile profile={profile.data} followers={followers} following={following}>
      <Button
        className={`${followStatus.data && 'opacity-50'} px-3 py-1 text-sm font-semibold`}
        onClick={() => {
          setFollowingStatus.mutate(profileId);
        }}
      >
        {followStatus.data ? 'Unfollow' : 'Follow'}
      </Button>
    </Profile>
  );
};

export default ForeignProfile;
