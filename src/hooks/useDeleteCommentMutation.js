import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteComment from '../services/deleteComment';

const useDeleteCommentMutation = (apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => {
      return deleteComment(commentId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedPosts'] });
      return queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export default useDeleteCommentMutation;
