import { useMutation, useQueryClient } from '@tanstack/react-query';
import signin from '../services/signin';
import { useNavigate } from 'react-router-dom';

const useSigninMutation = (apiUrl, setErrors) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (formData) => {
      return await signin(formData, apiUrl);
    },
    onSuccess: () => {
      queryClient.clear();
      navigate('/home');
    },
    onError: (error) => {
      setErrors(error.errors);
    },
    throwOnError: false,
  });
};

export default useSigninMutation;
