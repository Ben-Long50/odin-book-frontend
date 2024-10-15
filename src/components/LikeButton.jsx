import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';

const LikeButton = (props) => {
  return (
    <button className="text-primary" onClick={props.onClick}>
      <Icon
        className={`${props.likedStatus && 'text-pink-600'}`}
        path={props.likedStatus ? mdiHeart : mdiHeartOutline}
        size={props.size || 1.25}
      />
    </button>
  );
};

export default LikeButton;
