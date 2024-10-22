import Icon from '@mdi/react';
import RootPortal from '../layouts/RootPortal';
import { mdiAccount } from '@mdi/js';

const ProfilePicDetail = (props) => {
  if (!props.modalOpen) return null;

  return (
    <RootPortal
      className={props.className}
      onClick={props.toggleProfilePicDetailOpen}
    >
      <div className="fade-in-bottom mx-auto flex flex-col items-center gap-6 p-4">
        <h1 className="text-3xl font-semibold text-gray-50">
          {props.profile.username}
        </h1>
        <div
          className={`${props.className} flex items-center justify-center overflow-hidden rounded-full ${!props.image && 'bg-emerald-300'} text-5xl`}
        >
          {props.profile.profilePicUrl ? (
            <img
              className="aspect-square min-h-full min-w-full object-cover md:max-h-dvh-50"
              src={props.profile.profilePicUrl}
              alt={`${props.profile.username}'s profile picture`}
            />
          ) : (
            <Icon className="m-2 size-full text-gray-900" path={mdiAccount} />
          )}
        </div>
      </div>
    </RootPortal>
  );
};

export default ProfilePicDetail;
