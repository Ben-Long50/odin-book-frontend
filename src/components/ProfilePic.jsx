import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

const ProfilePic = (props) => {
  return (
    <div
      className={`${props.className} flex items-center justify-center rounded-full bg-emerald-300 p-2 text-5xl`}
    >
      <Icon className="size-full text-gray-900" path={mdiAccount} />
    </div>
  );
};

export default ProfilePic;
