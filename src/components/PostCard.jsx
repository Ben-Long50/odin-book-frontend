import { useContext, useEffect, useState } from 'react';
import PostDetail from './PostDetail';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import useLikeStatusMutation from '../hooks/useLikeStatusMutation';

const PostCard = (props) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const { activeProfile } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);
  const [postOpen, setPostOpen] = useState(false);

  useEffect(() => {
    let status = false;
    props.post.likes.forEach((like) => {
      if (like.profileId === activeProfile.id) {
        status = true;
      }
    });
    setLikeStatus(status);
  }, [props.post]);

  const toggleLikeStatus = useLikeStatusMutation(
    props.post.id,
    activeProfile.id,
    apiUrl,
    likeStatus,
  );

  const togglePostOpen = () => {
    setPostOpen(!postOpen);
  };

  return (
    <div
      className={`${props.className} timing flex aspect-square cursor-pointer items-center overflow-hidden bg-black object-cover md:hover:opacity-60`}
      onClick={togglePostOpen}
    >
      <img src={props.post.mediaUrl} alt="Post" />
      <PostDetail
        post={props.post}
        likeStatus={likeStatus}
        toggleLikeStatus={toggleLikeStatus}
        profile={props.profile}
        postOpen={postOpen}
        setPostOpen={setPostOpen}
        togglePostOpen={togglePostOpen}
        toggleNotificationbar={props.toggleNotificationbar}
      />
    </div>
  );
};

export default PostCard;
