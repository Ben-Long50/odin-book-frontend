import { useMutation, useQueryClient } from '@tanstack/react-query';
import likePost from '../services/likePost';
import unlikePost from '../services/unlikePost';

const useLikeStatusMutation = (postId, activeId, apiUrl, likeStatus, type) => {
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
      if (type === 'feed') {
        return queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
      } else if (type === 'post') {
        return queryClient.invalidateQueries({ queryKey: ['posts'] });
      } else if (type === 'bookmark') {
        return queryClient.invalidateQueries({
          queryKey: ['bookmarks'],
          exact: false,
        });
      }
    },
  });
};

export default useLikeStatusMutation;
