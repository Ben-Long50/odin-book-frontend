import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteSearchEntry from '../services/deleteSearchEntry';

const useDeleteSearchMutation = (activeId, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (searchedId) => {
      deleteSearchEntry(searchedId, activeId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['searchHistory']);
    },
  });
};

export default useDeleteSearchMutation;
