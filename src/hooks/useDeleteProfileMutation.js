import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteProfile from '../services/deleteProfile';
import { useNavigate } from 'react-router-dom';

const useDeleteProfileMutation = (profileId, apiUrl) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return deleteProfile(profileId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profiles']);
      navigate('/manage');
    },
  });
};

export default useDeleteProfileMutation;
