import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: 'Kitty',
    posts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    firstName: 'Kitty',
    lastName: 'Long',
  });

  return (
    <PerfectScrollbar className="overflow-y-auto">
      <div className="text-primary layout-cols center grid p-4 md:p-6 lg:p-8">
        <div className="col-start-2 col-end-3 flex flex-col gap-4 justify-self-center">
          <h2>{profile.username}</h2>
          <div className="flex items-center gap-8">
            <div className="mr-8 flex size-24 items-center justify-center rounded-full bg-emerald-300 text-5xl">
              K
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="text-primary text-2xl">{profile.posts.length}</h2>
              <h3 className="text-tertiary text-lg">Posts</h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="text-primary text-2xl">{profile.posts.length}</h2>
              <h3 className="text-tertiary text-lg">Followers</h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="text-primary text-2xl">{profile.posts.length}</h2>
              <h3 className="text-tertiary text-lg">Following</h3>
            </div>
          </div>
          <p className="font-semibold">
            {profile.firstName + '' + profile.lastName}
          </p>
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Profile;
