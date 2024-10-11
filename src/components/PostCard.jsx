import { useState } from 'react';
import PostDetail from './PostDetail';

const PostCard = (props) => {
  const [postOpen, setPostOpen] = useState(false);

  const togglePostOpen = () => {
    setPostOpen(!postOpen);
  };

  return (
    <div
      className="aspect-square overflow-hidden object-cover"
      onClick={togglePostOpen}
    >
      <img
        className="timing cursor-pointer hover:opacity-60"
        src={props.post.mediaUrl}
        alt="Post"
      />
      <PostDetail
        post={props.post}
        layoutSize={props.layoutSize}
        followStatus={props.followStatus}
        setFollowingStatus={props.setFollowingStatus}
        profile={props.profile}
        postOpen={postOpen}
        togglePostOpen={togglePostOpen}
      />
    </div>
  );
};

export default PostCard;
