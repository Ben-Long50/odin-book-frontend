import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import Timestamp from './Timestamp';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteNotification from '../services/deleteNotification';
import { AuthContext } from './AuthContext';
import PostCard from './PostCard';

const Notification = (props) => {
  const [message, setMessage] = useState('');
  const [post, setPost] = useState(null);
  const [postPicUrl, setPostPicUrl] = useState('');
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const mutateNotification = useMutation({
    mutationFn: async () =>
      await deleteNotification(props.notification.id, apiUrl),
    onSuccess: () => queryClient.invalidateQueries(['activeProfile']),
  });

  useEffect(() => {
    switch (true) {
      case !!props.notification.followerId:
        setMessage('followed you');
        break;
      case !!props.notification.commentId:
        setMessage('commented on your post');
        setPost(props.notification.newComment.post);
        setPostPicUrl(props.notification.newComment.post.mediaUrl);
        break;
      case !!props.notification.postLikeId:
        setMessage('liked your post');
        setPost(props.notification.newPostLike.post);
        setPostPicUrl(props.notification.newPostLike.post.mediaUrl);
        break;
      case !!props.notification.commentLikeId:
        setMessage('liked your comment');
        setPost(props.notification.newCommentLike.comment.post);
        setPostPicUrl(props.notification.newCommentLike.comment.post.mediaUrl);
        break;
      default:
        setMessage('');
        break;
    }
  }, [props.notification]);

  return (
    <div className="flex w-full items-center justify-between gap-4 py-2 pl-2">
      <div className="flex items-center">
        <Link
          to={
            activeProfile.id === props.profile.id
              ? `/profile`
              : `/profile/${props.profile.username}`
          }
          state={props.profile.id}
          onClick={() => props.toggleNotificationbar()}
        >
          <ProfilePic
            image={props.profile.profilePicUrl}
            className="mr-4 size-12"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            to={
              activeProfile.id === props.profile.id
                ? `/profile`
                : `/profile/${props.profile.username}`
            }
            state={props.profile.id}
            onClick={() => props.toggleNotificationbar()}
          >
            <h3 className="text-primary font-semibold">
              {props.profile.username}
            </h3>
          </Link>
          <p className="text-secondary text-sm">{message}</p>
          <Timestamp date={props.date} />
        </div>
      </div>

      <div className="flex grow items-center justify-end">
        {postPicUrl && (
          <PostCard
            className="size-16 rounded-sm"
            post={post}
            profile={props.notification.profile}
            layoutSize={props.layoutSize}
            // followStatus={props.followStatus}
            // setFollowingStatus={props.setFollowingStatus}
          />
        )}
        <button
          className="py-2 pl-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            mutateNotification.mutate();
          }}
        >
          <Icon className="text-tertiary" path={mdiClose} size={0.9} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
