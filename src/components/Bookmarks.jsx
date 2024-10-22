import Icon from '@mdi/react';
import { mdiBookmarkOutline } from '@mdi/js';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import getBookmarks from '../services/getBookmarks';
import PostCard from './PostCard';
import { useOutletContext } from 'react-router-dom';
import Loading from './Loading';

const Bookmarks = () => {
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const [layoutSize] = useOutletContext();

  const bookmarks = useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const bookmarks = await getBookmarks(activeProfile.id, apiUrl);

      return bookmarks ? bookmarks : [];
    },
  });

  if (bookmarks.isPending || bookmarks.isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-primary w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="fade-in-bottom flex items-center justify-center gap-4">
          <Icon path={mdiBookmarkOutline} size={1.75} />
          <h1 className="text-primary py-4 text-center text-2xl font-semibold">
            Bookmarked Posts
          </h1>
        </div>
        {bookmarks.data && bookmarks.data.length < 1 ? (
          <h2 className="fade-in-bottom w-full text-center text-2xl font-semibold">
            You have no bookmarked posts
          </h2>
        ) : (
          <div className="fade-in-bottom grid w-full grid-cols-3 gap-1">
            {bookmarks.data.map((bookmark, index) => (
              <PostCard
                key={index}
                post={bookmark.post}
                layoutSize={layoutSize}
                profile={bookmark.post.profile}
                followStatus={true}
                // setFollowingStatus={setFollowingStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
