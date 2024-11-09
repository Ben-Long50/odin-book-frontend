import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import CloudinaryImage from './CloudinaryImage';

const ProfilePic = (props) => {
  return (
    <div
      className={`${props.className} flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full ${!props.image && 'bg-emerald-400 dark:bg-emerald-300'} text-5xl`}
      onClick={props.onClick}
    >
      {props.imagePreview ? (
        props.imagePreview ? (
          <img
            className="min-h-full min-w-full object-cover"
            src={props.imagePreview}
          />
        ) : (
          <Icon className="m-2 size-full text-gray-900" path={mdiAccount} />
        )
      ) : props.image ? (
        <CloudinaryImage
          className="min-h-full min-w-full object-cover"
          url={props.image}
        />
      ) : (
        <Icon className="m-2 size-full text-gray-900" path={mdiAccount} />
      )}
    </div>
  );
};

export default ProfilePic;
