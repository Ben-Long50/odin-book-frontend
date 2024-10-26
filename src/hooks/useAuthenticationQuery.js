import { useQuery } from '@tanstack/react-query';
import getAuthStatus from '../services/getAuthStatus';

const useAuthenticationQuery = (apiUrl) => {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: () => getAuthStatus(apiUrl),
    refetchOnWindowFocus: true,
    staleTime: 60000,
    throwOnError: false,
  });
};

export default useAuthenticationQuery;
