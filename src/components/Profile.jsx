import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Icon from '@mdi/react';
import { mdiCircleSmall, mdiViewGrid } from '@mdi/js';
import { useOutletContext, Link } from 'react-router-dom';
import Button from './Button';
import ProfilePic from './ProfilePic';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: 'Kitty_da_TA',
    posts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    petName: 'Kitty',
    species: 'Cat',
    breed: 'Turkish Angora',
    bio: "I'm just a little Turkish Angora!",
  });
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [layoutSize] = useOutletContext();

  useEffect(() => {
    if (!profile.posts || profile.posts.length === 0) return;

    profile.posts.forEach((post, index) => {
      setTimeout(() => {
        setVisiblePosts((prevPosts) => [...prevPosts, post]);
      }, 100 * index);
    });

    return () => setVisiblePosts([]);
  }, [profile.posts]);

  return (
    <PerfectScrollbar className="h-full overflow-y-auto">
      <div className="text-primary layout-cols grid py-4 md:p-6 lg:p-8">
        {layoutSize !== 'small' && layoutSize !== 'xsmall' ? (
          <>
            <div className="col-start-2 col-end-3 flex w-full flex-col justify-self-center">
              <div className="flex items-center justify-evenly">
                <ProfilePic className="fade-in-left size-40" />
                <div className="fade-in-right flex h-full flex-col items-start justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <h2 className="text-primary text-2xl">
                      {profile.username}
                    </h2>
                    <Link to="edit">
                      <Button className="ml-4 px-3 py-1 text-sm font-semibold">
                        Edit profile
                      </Button>
                    </Link>
                    <Button className="px-3 py-1 text-sm font-semibold">
                      View archive
                    </Button>
                  </div>
                  <div className="flex items-center justify-start gap-8">
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-primary text-xl">
                        {profile.posts.length}
                      </h2>
                      <h3 className="text-tertiary text-lg">Posts</h3>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-primary text-xl">
                        {profile.posts.length}
                      </h2>
                      <h3 className="text-tertiary text-lg">Followers</h3>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-primary text-xl">
                        {profile.posts.length}
                      </h2>
                      <h3 className="text-tertiary text-lg">Following</h3>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 text-lg">
                    <div className="flex w-full items-center justify-start">
                      <p className="text-primary text-xl font-semibold">
                        {profile.petName}
                      </p>
                      <Icon path={mdiCircleSmall} size={1} />
                      <p className="text-secondary">
                        {profile.species} ({profile.breed})
                      </p>
                    </div>
                    <p className="text-secondary">{profile.bio}</p>
                  </div>
                </div>
              </div>
              <hr className="fade-in-bottom bg-secondary col-start-2 col-end-3 mt-12 w-full" />
              <div className="fade-in-bottom my-4 flex items-center justify-center gap-3">
                <Icon path={mdiViewGrid} size={1.3} />
                <h3 className="text-center text-2xl">Posts</h3>
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
          </>
        ) : (
          <div className="col-start-2 col-end-3 flex w-full flex-col justify-self-center">
            <div className="mx-auto flex flex-col items-start gap-4 px-4 pt-4">
              <div className="flex items-center gap-10">
                <ProfilePic className="fade-in-left w-[clamp(100px,20vw,200px)] shrink-0" />
                <div className="fade-in-right flex h-full flex-col items-start justify-center gap-4">
                  <div className="flex items-center justify-start gap-2">
                    <h2 className="text-2xl">{profile.username}</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link to="edit">
                      <Button className="px-3 py-1 text-sm font-semibold">
                        Edit profile
                      </Button>
                    </Link>
                    <Button className="px-3 py-1 text-sm font-semibold">
                      View archive
                    </Button>
                  </div>
                </div>
              </div>
              <div className="fade-in-bottom flex w-full flex-col gap-2 px-2 text-lg">
                <div className="flex w-full items-center justify-start">
                  <p className="text-primary text-xl font-semibold">
                    {profile.petName}
                  </p>
                  <Icon path={mdiCircleSmall} size={1} />
                  <p className="text-secondary">
                    {profile.species} ({profile.breed})
                  </p>
                </div>
                <p className="text-secondary">{profile.bio}</p>
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary my-4" />
            <div className="fade-in-bottom -my-2 grid grid-cols-3 items-center gap-8 px-4">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-primary text-lg">{profile.posts.length}</h2>
                <h3 className="text-tertiary">Posts</h3>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-primary text-lg">{profile.posts.length}</h2>
                <h3 className="text-tertiary">Followers</h3>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-primary text-lg">{profile.posts.length}</h2>
                <h3 className="text-tertiary">Following</h3>
              </div>
            </div>
            <hr className="fade-in-bottom bg-secondary mb-2 mt-4" />
            <div className="fade-in-bottom mb-2 flex items-center justify-center gap-3">
              <Icon path={mdiViewGrid} size={0.9} />
              <h3 className="text-center">Posts</h3>
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
        )}
      </div>
    </PerfectScrollbar>
  );
};

export default Profile;
