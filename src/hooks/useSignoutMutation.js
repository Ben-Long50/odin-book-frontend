import { useMutation, useQueryClient } from '@tanstack/react-query';
import signout from '../services/signout';

const useSignoutMutation = (apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await signout(apiUrl);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export default useSignoutMutation;
