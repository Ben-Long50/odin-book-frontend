import { useQuery } from '@tanstack/react-query';
import getProfile from '../services/getProfile';

const useForeignProfileQuery = (profileId, apiUrl) => {
  return useQuery({
    queryKey: ['foreignProfile', profileId],
    queryFn: () => {
      return getProfile(profileId, apiUrl);
    },
  });
};

export default useForeignProfileQuery;
