import { useMutation, useQueryClient } from '@tanstack/react-query';
import setActiveProfile from '../services/setActiveProfile';

const useActiveProfileMutation = (apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId) => {
      return setActiveProfile(profileId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profiles', 'activeProfile']);
    },
  });
};

export default useActiveProfileMutation;
