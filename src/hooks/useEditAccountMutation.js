import { useMutation, useQueryClient } from '@tanstack/react-query';
import editAccount from '../services/editAccount';

const useEditAccountMutation = (apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      console.log([...formData.entries()]);

      return editAccount(formData, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['account']);
    },
    throwOnError: false,
  });
};

export default useEditAccountMutation;
