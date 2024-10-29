import PerfectScrollbar from 'react-perfect-scrollbar';
import ProfileForm from './ProfileForm';
import { useLocation } from 'react-router-dom';

const ProfileCreate = () => {
  const location = useLocation();
  const { state } = location;
  const profile = state;

  return (
    <PerfectScrollbar className="h-full overflow-y-auto">
      <div className="text-primary layout-cols grid py-4 md:p-6 lg:p-8">
        <div className="col-start-2 col-end-3 flex h-full w-full max-w-2xl flex-col gap-8 justify-self-center p-4">
          <h1 className="fade-in-left text-primary text-2xl font-semibold">
            Create Profile
          </h1>
          <ProfileForm profile={profile} submitText="Create profile" />
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default ProfileCreate;
