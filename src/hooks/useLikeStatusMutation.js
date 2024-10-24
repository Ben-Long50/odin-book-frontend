import { useMutation, useQueryClient } from '@tanstack/react-query';
import likePost from '../services/likePost';
import unlikePost from '../services/unlikePost';

const useLikeStatusMutation = (postId, activeId, apiUrl, likeStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!likeStatus) {
        await likePost(postId, activeId, apiUrl);
      } else {
        await unlikePost(postId, activeId, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
};

export default useLikeStatusMutation;
