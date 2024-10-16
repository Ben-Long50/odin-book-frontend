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
import Button from './Button';
import { Link } from 'react-router-dom';

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

  if (feedPosts.data.length < 1) {
    return (
      <div className="fade-in-bottom mt-4 flex flex-col items-center gap-4 px-2 md:mt-8">
        <h2 className="text-primary text-center text-2xl font-semibold">
          Your current profile does not follow anyone actively posting
        </h2>
        <p className="text-secondary text-center text-lg">
          Check out the explore page to find other members to follow!
        </p>
        <Link className="w-1/2" to="/explore">
          <Button className="w-full p-2">Explore</Button>
        </Link>
      </div>
    );
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
