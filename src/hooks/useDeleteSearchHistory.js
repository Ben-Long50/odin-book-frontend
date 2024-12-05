import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteSearchHistory from '../services/deleteSearchHistory';

const useDeleteSearchHistory = (activeId, apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSearchHistory(activeId, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['searchHistory'],
        exact: false,
      });
    },
  });
};

export default useDeleteSearchHistory;
