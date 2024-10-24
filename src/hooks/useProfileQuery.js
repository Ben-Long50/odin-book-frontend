import { useQuery } from '@tanstack/react-query';
import getUserProfiles from '../services/getUserProfiles';

const useProfileQuery = (apiUrl) => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const profiles = await getUserProfiles(apiUrl);
      return profiles || [];
    },
  });
};

export default useProfileQuery;
