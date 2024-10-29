import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteAccount from '../services/deleteAccount';

const useDeleteAccountMutation = (apiUrl) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return deleteAccount(apiUrl);
    },
    onSuccess: () => {
      queryClient.clear();
      navigate('/signin');
    },
  });
};

export default useDeleteAccountMutation;
