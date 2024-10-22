import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

const ProfilePic = (props) => {
  return (
    <div
      className={`${props.className} flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full ${!props.image && 'bg-emerald-300'} text-5xl`}
      onClick={props.onClick}
    >
      {props.image ? (
        <img
          className="min-h-full min-w-full object-cover"
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
