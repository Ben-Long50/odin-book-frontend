import { useQuery } from '@tanstack/react-query';
import getFollowStatus from '../services/getFollowStatus';

const useFollowStatusQuery = (activeId, profileId, apiUrl, postOpen) => {
  return useQuery({
    queryKey: ['followStatus', activeId, profileId],
    queryFn: async () => {
      const status = await getFollowStatus(activeId, profileId, apiUrl);
      return status;
    },
    enabled: postOpen === true,
  });
};

export default useFollowStatusQuery;
