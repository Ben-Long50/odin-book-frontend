import { useMutation, useQueryClient } from '@tanstack/react-query';
import createComment from '../services/createComment';

const useCommentMutation = (postId, profileId, activeId, apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment) => {
      return createComment(postId, profileId, activeId, comment, apiUrl);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(['posts']);
    },
  });
};

export default useCommentMutation;
