import { useMutation, useQueryClient } from '@tanstack/react-query';
import editAccount from '../services/editAccount';
import { useNavigate } from 'react-router-dom';

const useEditAccountMutation = (apiUrl) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) => {
      return editAccount(formData, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['account']);
      navigate(-1);
    },
  });
};

export default useEditAccountMutation;
