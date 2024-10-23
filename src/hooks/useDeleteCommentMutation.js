import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteComment from '../services/deleteComment';

const useDeleteCommentMutation = (apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => {
      return deleteComment(commentId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });
};

export default useDeleteCommentMutation;
