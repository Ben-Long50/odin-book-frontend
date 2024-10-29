import { useMutation } from '@tanstack/react-query';
import createShareNotification from '../services/createShareNotification';

const useShareMutation = (activeId, postId, apiUrl) => {
  return useMutation({
    mutationFn: async (shareList) => {
      return await createShareNotification(shareList, activeId, postId, apiUrl);
    },
  });
};

export default useShareMutation;
