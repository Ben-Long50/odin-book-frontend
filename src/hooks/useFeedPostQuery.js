import { useQuery } from '@tanstack/react-query';
import getFollowedPosts from '../services/getFollowedPosts';

const useFeedPostQuery = (activeId, apiUrl) => {
  return useQuery({
    queryKey: ['feedPosts'],
    queryFn: async () => {
      const posts = await getFollowedPosts(activeId, apiUrl);
      return posts || [];
    },
  });
};

export default useFeedPostQuery;
