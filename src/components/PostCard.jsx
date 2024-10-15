import { useContext, useEffect, useState } from 'react';
import PostDetail from './PostDetail';
import { GlobalContext } from './GlobalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import likePost from '../services/likePost';
import { AuthContext } from './AuthContext';
import unlikePost from '../services/unlikePost';
import createComment from '../services/createComment';

const PostCard = (props) => {
  const [likedStatus, setLikedStatus] = useState(false);
  const { activeProfile } = useContext(GlobalContext);
  const { apiUrl } = useContext(AuthContext);
  const [postOpen, setPostOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    let status = false;
    props.post.likes.forEach((like) => {
      if (like.profileId === activeProfile.id) {
        status = true;
      }
    });
    setLikedStatus(status);
  }, [props.post]);

  const toggleLikedStatus = useMutation({
    mutationFn: async () => {
      if (!likedStatus) {
        await likePost(props.post.id, activeProfile.id, apiUrl);
      } else {
        await unlikePost(props.post.id, activeProfile.id, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const comment = useMutation({
    mutationFn: async (comment) => {
      await createComment(props.post.id, activeProfile.id, comment, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const togglePostOpen = () => {
    setPostOpen(!postOpen);
  };

  return (
    <div
      className="timing flex aspect-square h-full cursor-pointer items-center justify-center overflow-hidden bg-black object-cover hover:opacity-60"
      onClick={togglePostOpen}
    >
      <img src={props.post.mediaUrl} alt="Post" />
      <PostDetail
        post={props.post}
        layoutSize={props.layoutSize}
        followStatus={props.followStatus}
        setFollowingStatus={props.setFollowingStatus}
        likedStatus={likedStatus}
        toggleLikedStatus={toggleLikedStatus}
        profile={props.profile}
        postOpen={postOpen}
        togglePostOpen={togglePostOpen}
        comment={comment}
      />
    </div>
  );
};

export default PostCard;
