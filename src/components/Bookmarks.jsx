import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Icon from '@mdi/react';
import { mdiBookmarkOutline } from '@mdi/js';

const Bookmarks = () => {
  const [bookmarkedPosts, setbookmarkedPosts] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ]);
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    if (!bookmarkedPosts || bookmarkedPosts.length === 0) return;

    bookmarkedPosts.forEach((post, index) => {
      setTimeout(() => {
        setVisiblePosts((prevPosts) => [...prevPosts, post]);
      }, 100 * index);
    });

    return () => setVisiblePosts([]);
  }, [bookmarkedPosts]);
  return (
    <PerfectScrollbar className="text-primary w-full overflow-y-auto md:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="fade-in-bottom flex items-center justify-center gap-4">
          <Icon path={mdiBookmarkOutline} size={1.75} />
          <h1 className="text-primary py-4 text-center text-2xl font-semibold">
            Bookmarked Posts
          </h1>
        </div>

        <div className="grid w-full grid-cols-3 gap-1">
          {visiblePosts.map((post, index) => (
            <div
              key={index}
              className="fade-in-bottom bg-secondary-2 aspect-square"
            />
          ))}
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Bookmarks;
