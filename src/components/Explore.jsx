import { useContext, useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Icon from '@mdi/react';
import { mdiCompassOutline } from '@mdi/js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import getExplorePosts from '../services/getExplorePosts';
import PostCard from './PostCard';
import { useOutletContext } from 'react-router-dom';
import followProfile from '../services/followProfile';

const Explore = () => {
  const { activeProfile, setActiveFollowing } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);
  const [layoutSize] = useOutletContext();
  // const queryClient = useQueryClient();

  const posts = useQuery({
    queryKey: ['explorePosts'],
    queryFn: async () => {
      const posts = await getExplorePosts(activeProfile.id, apiUrl);
      if (posts) {
        return posts;
      } else {
        return [];
      }
    },
  });

  const setFollowingStatus = useMutation({
    mutationFn: async (profileId) => {
      await followProfile(activeProfile.id, profileId, apiUrl);
      return profileId;
    },
    onSuccess: (profileId) => {
      setActiveFollowing((prevFollowing) => [...prevFollowing, profileId]);
    },
  });

  if (posts.isLoading) {
    return <Loading />;
  }

  return (
    <PerfectScrollbar className="text-primary w-full overflow-y-auto md:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="fade-in-bottom flex items-center justify-center gap-4">
          <Icon path={mdiCompassOutline} size={1.75} />
          <h1 className="text-primary py-4 text-center text-2xl font-semibold">
            Explore
          </h1>
        </div>
        <div className="fade-in-bottom grid w-full grid-cols-3 gap-1 md:mt-6">
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
                setFollowingStatus={setFollowingStatus}
              />
            ))
          )}
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Explore;
