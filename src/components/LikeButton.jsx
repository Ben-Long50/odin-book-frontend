import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import { useState } from 'react';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
  };

  return (
    <button className="text-primary" onClick={toggleLiked}>
      <Icon
        className={`${liked && 'text-pink-600'}`}
        path={liked ? mdiHeart : mdiHeartOutline}
        size={1.25}
      />
    </button>
  );
};

export default LikeButton;
