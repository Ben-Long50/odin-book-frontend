import { useQuery } from '@tanstack/react-query';
import getPosts from '../services/getPosts';

const usePostQuery = (profileId, apiUrl) => {
  return useQuery({
    queryKey: ['posts', profileId],
    queryFn: async () => {
      const result = await getPosts(profileId, apiUrl);
      return result ? result : [];
    },
  });
};

export default usePostQuery;
