import Icon from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import createBookmark from '../services/createBookmark';
import deleteBookmark from '../services/deleteBookmark';

const BookmarkButton = (props) => {
  const [bookmarkedStatus, setBookmarkedStatus] = useState(false);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const toggleBookmarkedStatus = useMutation({
    mutationFn: async () => {
      if (!bookmarkedStatus) {
        await createBookmark(activeProfile.id, props.post.id, apiUrl);
      } else {
        await deleteBookmark(activeProfile.id, props.post.id, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarks', 'activeProfile']);
    },
  });

  useEffect(() => {
    let status = false;
    activeProfile.bookmarks.forEach((bookmark) => {
      if (bookmark.postId === props.post.id) {
        status = true;
      }
    });
    setBookmarkedStatus(status);
  }, [props.post, activeProfile]);

  return (
    <button
      className="text-primary"
      onClick={() => {
        toggleBookmarkedStatus.mutate();
      }}
    >
      <Icon
        className={`${bookmarkedStatus && 'text-red-600'}`}
        path={bookmarkedStatus ? mdiBookmark : mdiBookmarkOutline}
        size={1.25}
      />
    </button>
  );
};

export default BookmarkButton;
