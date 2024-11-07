import { useQuery } from '@tanstack/react-query';
import getServerStatus from '../services/getServerStatus';

const useServerStatusQuery = () => {
  return useQuery({
    queryKey: ['serverStatus'],
    queryFn: () => getServerStatus(import.meta.env.VITE_API_URL),
    refetchOnWindowFocus: false,
    throwOnError: false,
  });
};

export default useServerStatusQuery;
