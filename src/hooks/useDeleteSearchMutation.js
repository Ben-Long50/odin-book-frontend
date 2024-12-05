import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteSearchEntry from '../services/deleteSearchEntry';

const useDeleteSearchMutation = (activeId, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (searchedId) => {
      return await deleteSearchEntry(searchedId, activeId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['searchHistory'],
        exact: false,
      });
    },
  });
};

export default useDeleteSearchMutation;
