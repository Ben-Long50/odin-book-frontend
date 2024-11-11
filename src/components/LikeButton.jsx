import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';

const LikeButton = (props) => {
  return (
    <button
      aria-label="Like post"
      className={`${props.className} text-primary flex items-center justify-center`}
      onClick={props.onClick}
    >
      <Icon
        className={`${props.likeStatus && 'text-pink-600'}`}
        path={props.likeStatus ? mdiHeart : mdiHeartOutline}
        size={props.size || 1.25}
      />
    </button>
  );
};

export default LikeButton;
