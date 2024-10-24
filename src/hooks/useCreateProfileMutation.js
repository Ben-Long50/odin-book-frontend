import { useMutation, useQueryClient } from '@tanstack/react-query';
import createProfile from '../services/createProfile';

const useCreateProfileMutation = (apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      return createProfile(formData, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profiles']);
    },
  });
};

export default useCreateProfileMutation;
