import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import Timestamp from './Timestamp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import likeComment from '../services/likeComment.js';
import { useContext, useEffect, useState } from 'react';
import unlikeComment from '../services/unlikeComment.js';
import { GlobalContext } from './GlobalContext';
import { AuthContext } from './AuthContext';
import LikeButton from './LikeButton';

const Comment = (props) => {
  const [likedStatus, setLikedStatus] = useState(false);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    let status = false;
    props.likes?.forEach((like) => {
      if (like.profileId === activeProfile.id) {
        status = true;
      }
    });
    setLikedStatus(status);
  }, [props.likes]);

  const toggleLikedStatus = useMutation({
    mutationFn: async () => {
      if (!likedStatus) {
        await likeComment(props.id, activeProfile.id, apiUrl);
      } else {
        await unlikeComment(props.id, activeProfile.id, apiUrl);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  return (
    <div className="flex w-full items-start">
      <Link
        to={
          activeProfile.id === props.profile.id
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
      <div className="flex flex-col gap-1">
        <Link
          to={
            activeProfile.id === props.profile.id
              ? `/profile`
              : `/profile/${props.profile.username}`
          }
          state={props.profile.id}
        >
          <h3 className="text-primary text-lg font-semibold">
            {props.profile.username}
          </h3>
        </Link>
        <p className="text-secondary">{props.body}</p>
        <Timestamp date={props.date} />
      </div>
      {props.likes && (
        <div className="ml-auto flex items-center">
          {props.likes?.length > 0 && (
            <p className="text-tertiary text-sm">{props.likes.length}</p>
          )}
          <div className="flex size-10 items-center justify-center">
            <LikeButton
              size={0.8}
              likedStatus={likedStatus}
              onClick={() => toggleLikedStatus.mutate()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
