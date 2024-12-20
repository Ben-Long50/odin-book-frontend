import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteAllNotifications from '../services/deleteAllNotifications';

const useDeleteAllNotificationsMutation = (activeId, apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllNotifications(activeId, apiUrl),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
        exact: false,
      }),
  });
};

export default useDeleteAllNotificationsMutation;
