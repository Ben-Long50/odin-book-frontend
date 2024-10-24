import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiCompassOutline } from '@mdi/js';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import PostCard from './PostCard';
import { useOutletContext } from 'react-router-dom';
import useExplorePostQuery from '../hooks/useExplorePostQuery';

const Explore = () => {
  const { activeProfile } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);
  const [layoutSize] = useOutletContext();

  const posts = useExplorePostQuery(activeProfile.id, apiUrl);

  if (posts.isPending || posts.isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-primary w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="fade-in-bottom flex items-center justify-center gap-4">
          <Icon path={mdiCompassOutline} size={1.75} />
          <h1 className="text-primary py-4 text-center text-2xl font-semibold">
            Explore
          </h1>
        </div>
        <div className="fade-in-bottom grid w-full grid-cols-3 gap-0.5 md:mt-6 md:gap-1">
          {posts.data.length < 1 ? (
            <h2 className="col-span-3 w-full text-center text-2xl font-semibold">
              Nothing to explore
            </h2>
          ) : (
            posts.data.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                layoutSize={layoutSize}
                profile={post.profile}
                followStatus={false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
