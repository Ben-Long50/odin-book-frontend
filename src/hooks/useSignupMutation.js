import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import signup from '../services/signup';

const useSignupMutation = (apiUrl, setErrors) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (formData) => {
      return await signup(formData, apiUrl);
    },
    onSuccess: () => navigate('/signin'),
    onError: (error) => {
      setErrors(error.errors);
    },
    throwOnError: false,
  });
};

export default useSignupMutation;
