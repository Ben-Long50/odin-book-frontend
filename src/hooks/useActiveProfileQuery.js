import { useQuery } from '@tanstack/react-query';
import getActiveProfile from '../services/getActiveProfile';

const useActiveProfileQuery = (apiUrl) => {
  return useQuery({
    queryKey: ['activeProfile'],
    queryFn: () => {
      return getActiveProfile(apiUrl);
    },
  });
};

export default useActiveProfileQuery;
