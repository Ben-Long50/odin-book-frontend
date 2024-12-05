import { useMutation, useQueryClient } from '@tanstack/react-query';
import createPost from '../services/createPost';

const useCreatePostMutation = (activeId, apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      return createPost(formData, activeId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export default useCreatePostMutation;
