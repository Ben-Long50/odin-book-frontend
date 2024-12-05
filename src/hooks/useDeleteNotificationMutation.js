import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteNotification from '../services/deleteNotification';

const useDeleteNotificationsMutation = (notificationId, apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deleteNotification(notificationId, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeProfile'] });
      queryClient.invalidateQueries({
        queryKey: ['notifications'],
        exact: false,
      });
    },
  });
};
export default useDeleteNotificationsMutation;
