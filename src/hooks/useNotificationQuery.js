import { useQuery } from '@tanstack/react-query';
import getNotifications from '../services/getNotifications';

const useNotificationQuery = (activeId, apiUrl) => {
  return useQuery({
    queryKey: ['notifications', activeId],
    queryFn: () => {
      const result = getNotifications(activeId, apiUrl);
      return result ? result : [];
    },
  });
};

export default useNotificationQuery;
