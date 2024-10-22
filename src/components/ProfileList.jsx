import RootPortal from '../layouts/RootPortal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ProfileCard from './ProfileCard';

const ProfileList = (props) => {
  if (!props.modalOpen) return null;

  return (
    <RootPortal onClick={() => props.toggleModal()}>
      <div
        className={`${props.className} fade-in-bottom bg-secondary mx-auto my-auto max-h-dvh-50 max-w-xl md:rounded-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-primary bg-secondary sticky top-0 border-b p-4 text-2xl font-semibold md:rounded-t-xl">
          {props.title}
        </h1>
        <PerfectScrollbar className="p-3">
          {props.profiles?.length > 0 ? (
            props.profiles.map((profile) => {
              return <ProfileCard key={profile.id} profile={profile} />;
            })
          ) : (
            <p className="text-secondary p-1 text-xl">{`No ${props.title.toLowerCase()} found`}</p>
          )}
        </PerfectScrollbar>
      </div>
    </RootPortal>
  );
};

export default ProfileList;
