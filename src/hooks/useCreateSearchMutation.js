import { useMutation, useQueryClient } from '@tanstack/react-query';
import createSearchEntry from '../services/createSearchEntry';

const useCreateSearchMutation = (activeId, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (searchedId) => {
      return await createSearchEntry(searchedId, activeId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['searchHistory'],
        exact: false,
      });
    },
  });
};

export default useCreateSearchMutation;
