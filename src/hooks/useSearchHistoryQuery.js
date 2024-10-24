import { useQuery } from '@tanstack/react-query';
import getSearchHistory from '../services/getSearchHistory';

const useSearchHistoryQuery = (activeId, apiUrl) => {
  return useQuery({
    queryKey: ['searchHistory', activeId],
    queryFn: () => {
      return getSearchHistory(activeId, apiUrl);
    },
  });
};

export default useSearchHistoryQuery;
