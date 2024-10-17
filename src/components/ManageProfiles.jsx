import ProfilePic from './ProfilePic';
import Button from './Button';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, useOutletContext } from 'react-router-dom';
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiSquareEditOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import setActiveProfile from '../services/setActiveProfile';
import { GlobalContext } from './GlobalContext';
import { input } from '@testing-library/user-event/dist/cjs/event/input.js';

const ManageProfiles = () => {
  const { apiUrl } = useContext(AuthContext);
  const { profiles } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const [layoutSize] = useOutletContext();

  const changeActiveProfile = useMutation({
    mutationFn: (profileData) => {
      return setActiveProfile(profileData, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profiles', 'activeProfile']);
    },
  });

  return (
    <PerfectScrollbar className="text-primary flex w-full flex-col items-center overflow-y-auto p-4 md:p-6 lg:p-8">
      <h1 className="fade-in-left text-primary mb-4 text-2xl font-semibold md:mb-6">
        Manage Profiles
      </h1>
      <div className="flex w-full max-w-6xl flex-col gap-4 md:gap-6">
        {profiles.data.map((profile, index) => {
          return (
            <div
              key={index}
              className="fade-in-right bg-secondary-2 flex items-center justify-between rounded-2xl p-4"
            >
              <div className="mr-4 flex items-center justify-start gap-4">
                <ProfilePic
                  image={profile.profilePicUrl}
                  className="size-16 shrink-0"
                />
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="font-semibold">{profile.username}</p>
                  <p>{profile.petName}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 md:gap-8">
                <Link
                  className="hover:hover-secondary timing rounded-md p-2"
                  to="/profile/edit"
                  state={profile}
                >
                  <Icon
                    className="text-secondary"
                    path={mdiSquareEditOutline}
                    size={1.25}
                  />
                </Link>
                {layoutSize === 'xsmall' || layoutSize === 'small' ? (
                  profile.active ? (
                    <button>
                      <Icon
                        className="text-accent"
                        path={mdiCheckboxMarkedOutline}
                        size={1.25}
                      />
                    </button>
                  ) : (
                    <button>
                      <Icon
                        path={mdiCheckboxBlankOutline}
                        size={1.25}
                        onClick={() => changeActiveProfile.mutate(profile)}
                      />
                    </button>
                  )
                ) : profile.active ? (
                  <Button className="px-3 py-2 text-sm font-semibold">
                    Active profile
                  </Button>
                ) : (
                  <Button
                    className="px-3 py-2 text-sm font-semibold opacity-50"
                    onClick={() => changeActiveProfile.mutate(profile)}
                  >
                    Switch profile
                  </Button>
                )}
              </div>
            </div>
          );
        })}

        <Link className="w-1/2 self-end md:w-1/3" to="create">
          <Button className="fade-in-left w-full self-end p-2">
            Create Profile
          </Button>
        </Link>
      </div>
    </PerfectScrollbar>
  );
};

export default ManageProfiles;
