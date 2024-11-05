import ProfileForm from './ProfileForm';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProfileEdit = () => {
  const [deleteMode, setDeleteMode] = useState(false);
  const location = useLocation();
  const { state } = location;
  const [profile, setProfile] = useState(
    state || JSON.parse(localStorage.getItem('profile')),
  );

  useEffect(() => {
    if (state) {
      localStorage.setItem('profile', JSON.stringify(state));
      setProfile(state);
    }
  }, [state]);

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  return (
    <div className="text-primary layout-cols grid py-4 md:p-6 lg:p-8">
      <div className="col-start-2 col-end-3 flex h-full w-full max-w-2xl flex-col gap-8 justify-self-center p-4">
        <h1 className="fade-in-left text-primary text-2xl font-semibold">
          Edit Profile
        </h1>
        <ProfileForm
          formType="edit"
          deleteMode={deleteMode}
          toggleDeleteMode={toggleDeleteMode}
          profile={profile}
          submitText="Save profile settings"
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
