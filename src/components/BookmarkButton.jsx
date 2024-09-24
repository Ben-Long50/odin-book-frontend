import Icon from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';
import { useState } from 'react';

const BookmarkButton = () => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmarked = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <button className="text-primary" onClick={toggleBookmarked}>
      <Icon
        className={`${bookmarked && 'text-red-600'}`}
        path={bookmarked ? mdiBookmark : mdiBookmarkOutline}
        size={1.25}
      />
    </button>
  );
};

export default BookmarkButton;
