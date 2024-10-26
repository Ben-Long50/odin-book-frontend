import { useMutation } from '@tanstack/react-query';
import getSearchMatch from '../services/getSearchMatch';

const useSearchResultsMutation = (apiUrl) => {
  return useMutation({
    mutationFn: (searchQuery) => {
      return getSearchMatch(searchQuery, apiUrl);
    },
    throwOnError: false,
  });
};

export default useSearchResultsMutation;
