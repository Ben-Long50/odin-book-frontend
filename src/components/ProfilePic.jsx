import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

const ProfilePic = (props) => {
  return (
    <div
      className={`${props.className} flex items-center justify-center overflow-hidden rounded-full ${!props.image && 'bg-emerald-300'} text-5xl`}
    >
      {props.image ? (
        <img
          className="aspect-square min-h-full min-w-full object-cover"
          src={props.image}
          alt="Profile picture"
        />
      ) : (
        <Icon className="m-2 size-full text-gray-900" path={mdiAccount} />
      )}
    </div>
  );
};

export default ProfilePic;
