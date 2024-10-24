import { useMutation, useQueryClient } from '@tanstack/react-query';
import createBookmark from '../services/createBookmark';
import deleteBookmark from '../services/deleteBookmark';

const useBookmarkMutation = (activeId, postId, apiUrl) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookmarkStatus) => {
      if (!bookmarkStatus) {
        await createBookmark(activeId, postId, apiUrl);
      } else {
        await deleteBookmark(activeId, postId, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks']);
    },
  });
};

export default useBookmarkMutation;
