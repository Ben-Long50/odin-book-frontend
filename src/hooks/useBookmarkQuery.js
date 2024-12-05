import { useQuery } from '@tanstack/react-query';
import getBookmarks from '../services/getBookmarks';

const useBookmarkQuery = (activeId, apiUrl) => {
  return useQuery({
    queryKey: ['bookmarks', activeId],
    queryFn: () => getBookmarks(activeId, apiUrl),
  });
};

export default useBookmarkQuery;
