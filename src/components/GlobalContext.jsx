import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import getUserProfiles from '../services/getUserProfiles.js';
import getActiveProfile from '../services/getActiveProfile.js';
import Loading from './Loading.jsx';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [activeFollowers, setActiveFollowers] = useState([]);
  const [activeFollowing, setActiveFollowing] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  const profiles = useQuery({
    queryKey: ['profiles'],
    queryFn: () => {
      const profiles = getUserProfiles(apiUrl);
      if (profiles) {
        return profiles;
      } else {
        return [];
      }
    },
  });

  const activeProfile = useQuery({
    queryKey: ['activeProfile'],
    queryFn: async () => {
      const profile = await getActiveProfile(apiUrl);
      const followers = profile.followers.map(
        (follower) => follower.followerId,
      );
      const following = profile.following.map(
        (following) => following.profileId,
      );

      setActiveFollowers(followers);
      setActiveFollowing(following);
      return profile;
    },
  });

  if (profiles.isLoading || activeProfile.isLoading) {
    return <Loading />;
  }

  return (
    <GlobalContext.Provider
      value={{
        profiles,
        activeProfile: activeProfile.data,
        activeFollowers,
        activeFollowing,
        setActiveFollowing,
        notifications: activeProfile.data?.notified,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
