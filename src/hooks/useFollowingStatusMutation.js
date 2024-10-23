import { useMutation, useQueryClient } from '@tanstack/react-query';
import followProfile from '../services/followProfile';
import unfollowProfile from '../services/unfollowProfile';

const useFollowStatusMutation = (activeId, profileId, followStatus, apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!followStatus) {
        await followProfile(activeId, profileId, apiUrl);
      } else {
        await unfollowProfile(activeId, profileId, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        'activeProfile',
        'foreignProfile',
        'followStatus',
      ]);
    },
  });
};

export default useFollowStatusMutation;
