import { useMutation, useQueryClient } from '@tanstack/react-query';
import deletePost from '../services/deletePost';

const useDeletePostMutation = (apiUrl, togglePostOpen) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId) => {
      return deletePost(postId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      togglePostOpen();
    },
  });
};

export default useDeletePostMutation;
