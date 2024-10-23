import { useQuery } from '@tanstack/react-query';
import getProfile from '../services/getProfile';

const useForeignProfileQuery = (profileId, apiUrl) => {
  return useQuery({
    queryKey: ['foreignProfile'],
    queryFn: async () => {
      const profile = await getProfile(profileId, apiUrl);
      return profile;
    },
  });
};

export default useForeignProfileQuery;
