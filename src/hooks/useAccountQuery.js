import { useQuery } from '@tanstack/react-query';
import getAccount from '../services/getAccount';

const useAccountQuery = (apiUrl) => {
  return useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      return await getAccount(apiUrl);
    },
  });
};

export default useAccountQuery;
