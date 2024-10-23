import { useQuery } from '@tanstack/react-query';
import getComments from '../services/getComments';

const useCommentsQuery = (postId, apiUrl, postOpen) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const comments = await getComments(postId, apiUrl);
      return comments;
    },
    enabled: postOpen === true,
  });
};

export default useCommentsQuery;
