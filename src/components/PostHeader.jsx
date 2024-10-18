import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import Icon from '@mdi/react';
import { mdiCircleSmall } from '@mdi/js';

const PostHeader = (props) => {
  return (
    <div
      className={`${props.className} bg-secondary flex w-full items-center p-4`}
    >
      <Link
        to={
          props.activeProfile.id === props.profile.id
            ? `/profile`
            : `/profile/${props.profile.username}`
        }
        state={props.profile.id}
      >
        <ProfilePic
          image={props.profile.profilePicUrl}
          className="mr-4 size-10"
        />
      </Link>
      <div className="text-primary flex items-center">
        <Link
          to={
            props.activeProfile.id === props.profile.id
              ? `/profile`
              : `/profile/${props.profile.username}`
          }
          state={props.profile.id}
        >
          <h3 className="text-lg font-semibold">{props.profile.username}</h3>
        </Link>
        {!props.followStatus && (
          <>
            <Icon path={mdiCircleSmall} size={1} />
            <button
              className="text-accent"
              onClick={() => {
                props.setFollowingStatus.mutate(props.profile.id);
                props.setFollowStatus(true);
              }}
            >
              Follow
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
