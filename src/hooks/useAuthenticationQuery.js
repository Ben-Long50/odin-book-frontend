import { useQuery } from '@tanstack/react-query';
import getAuthStatus from '../services/getAuthStatus';

const useAuthenticationQuery = (apiUrl) => {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      return getAuthStatus(apiUrl);
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
    throwOnError: false,
  });
};

export default useAuthenticationQuery;
