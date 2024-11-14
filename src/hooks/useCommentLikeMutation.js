import { useMutation, useQueryClient } from '@tanstack/react-query';
import likeComment from '../services/likeComment';
import unlikeComment from '../services/unlikeComment';

const useCommentLikeMutation = (commentId, activeId, apiUrl, likeStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!likeStatus) {
        await likeComment(commentId, activeId, apiUrl);
      } else {
        await unlikeComment(commentId, activeId, apiUrl);
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(['comments']);
    },
  });
};

export default useCommentLikeMutation;
