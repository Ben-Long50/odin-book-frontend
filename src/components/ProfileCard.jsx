import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';

const ProfileCard = (props) => {
  return (
    <Link
      to={`/profile/${props.profile.username}`}
      key={props.profile.id}
      className="timing hover:bg-secondary-2 flex cursor-pointer items-center gap-6 rounded-lg p-2"
      state={props.profile.id}
      onClick={props.onClick}
    >
      <ProfilePic
        image={props.profile.profilePicUrl}
        className="size-12 shrink-0"
      />
      <div>
        <p className="text-primary text-lg">{props.profile.username}</p>
        <p className="text-tertiary">{props.profile.petName}</p>
      </div>
      {props.children}
    </Link>
  );
};

export default ProfileCard;
