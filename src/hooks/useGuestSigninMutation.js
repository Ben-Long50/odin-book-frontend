import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import guestSignin from '../services/guestSignin';

const useGuestSigninMutation = (apiUrl, setErrors) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      return await guestSignin(apiUrl);
    },
    onSuccess: () => navigate('/home'),
    onError: (error) => {
      setErrors(error.errors);
    },
    throwOnError: false,
  });
};

export default useGuestSigninMutation;
