import PerfectScrollbar from 'react-perfect-scrollbar';
import Post from './Post';
import { useContext } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/custom-scrollbar.css';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GlobalContext } from './GlobalContext';
import getFollowedPosts from '../services/getFollowedPosts';
import { AuthContext } from './AuthContext';
import Loading from './Loading';

const Feed = () => {
  const { activeProfile } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);
  const [layoutSize] = useOutletContext();

  const feedPosts = useQuery({
    queryKey: ['feedPosts'],
    queryFn: async () => {
      const posts = await getFollowedPosts(activeProfile.id, apiUrl);
      console.log(posts);

      if (posts.length > 0) {
        return posts;
      } else {
        return [];
      }
    },
  });

  if (feedPosts.isLoading) {
    return <Loading />;
  }

  return (
    <PerfectScrollbar className="text-primary flex w-full flex-col items-center overflow-y-auto md:p-6 lg:p-8">
      {feedPosts.data.map((post, index) => {
        return <Post key={index} post={post} layoutSize={layoutSize} />;
      })}
    </PerfectScrollbar>
  );
};

export default Feed;
