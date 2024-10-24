import { useQuery } from '@tanstack/react-query';
import getBookmarks from '../services/getBookmarks';

const useBookmarkQuery = (activeId, apiUrl) => {
  return useQuery({
    queryKey: ['bookmarks', activeId],
    queryFn: async () => {
      const bookmarks = await getBookmarks(activeId, apiUrl);
      return bookmarks ? bookmarks : [];
    },
  });
};

export default useBookmarkQuery;
