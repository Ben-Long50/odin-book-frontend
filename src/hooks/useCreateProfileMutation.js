import { useMutation, useQueryClient } from '@tanstack/react-query';
import createProfile from '../services/createProfile';
import { useNavigate } from 'react-router-dom';

const useCreateProfileMutation = (apiUrl) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) => {
      return createProfile(formData, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      navigate('/manage');
    },
  });
};

export default useCreateProfileMutation;
