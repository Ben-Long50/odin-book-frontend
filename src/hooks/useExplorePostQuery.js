import { useQuery } from '@tanstack/react-query';
import getExplorePosts from '../services/getExplorePosts';

const useExplorePostQuery = (activeId, apiUrl) => {
  return useQuery({
    queryKey: ['explorePosts', activeId],
    queryFn: async () => {
      const posts = await getExplorePosts(activeId, apiUrl);
      if (posts) {
        return posts;
      } else {
        return [];
      }
    },
  });
};

export default useExplorePostQuery;
