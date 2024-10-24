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
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';

const Comment = (props) => {
  const [likedStatus, setLikedStatus] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
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

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const toggleConfirmDeleteMode = () => {
    setConfirmDeleteMode(!confirmDeleteMode);
  };

  return (
    <div
      className={`${deleteMode ? 'comment-layout-2' : 'comment-layout'} timing grid w-full overflow-hidden`}
    >
      <div
        className={`${props.className} ${activeProfile.id === props.profile.id ? 'bg-secondary-2 cursor-pointer' : 'bg-secondary'} z-20 col-start-1 col-end-2 row-start-1 row-end-2 flex items-start p-4`}
        onClick={
          activeProfile.id === props.profile.id
            ? confirmDeleteMode
              ? () => {
                  toggleDeleteMode();
                  toggleConfirmDeleteMode();
                }
              : toggleDeleteMode
            : undefined
        }
      >
        <Link
          to={
            activeProfile.id === props.profile.id
              ? `/profile`
              : `/profile/${props.profile.username}`
          }
          state={props.profile.id}
          onClick={() => {
            props.togglePostOpen();
            props.toggleNotificationbar();
          }}
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
            onClick={() => {
              props.togglePostOpen();
              props.toggleNotificationbar();
            }}
          >
            <h3 className="text-primary text-lg font-semibold">
              {props.profile.username}
            </h3>
          </Link>
          <p className="text-secondary">{props.body}</p>
          <Timestamp date={props.date} />
        </div>
        {props.likes && (
          <div className="ml-auto flex items-center self-center">
            {props.likes?.length > 0 && (
              <p className="text-tertiary text-sm">{props.likes.length}</p>
            )}
            <div
              className="flex size-10 items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                toggleLikedStatus.mutate();
              }}
            >
              <LikeButton size={0.8} likedStatus={likedStatus} />
            </div>
          </div>
        )}
      </div>
      {activeProfile.id === props.profile.id && (
        <button
          className={`${confirmDeleteMode ? 'grid-cols-confirmDelete' : 'grid-cols-delete'} timing z-10 col-start-2 col-end-3 row-start-1 row-end-2 grid grid-rows-1 bg-red-600 text-gray-50`}
          onClick={
            props.type === 'caption'
              ? confirmDeleteMode
                ? () => props.mutate(props.id)
                : () => setConfirmDeleteMode(true)
              : () => props.mutate(props.id)
          }
        >
          <Icon
            className={`${deleteMode && !confirmDeleteMode ? 'opacity-100' : 'opacity-0'} ${confirmDeleteMode && 'opacity-0'} timing col-start-1 col-end-2 row-start-1 row-end-2 m-auto`}
            path={mdiTrashCanOutline}
            size={1.25}
          />
          <p
            className={`${confirmDeleteMode ? 'opacity-100' : 'opacity-0'} timing col-start-2 col-end-3 row-start-1 row-end-2 m-auto`}
          >
            Delete post
          </p>
        </button>
      )}
    </div>
  );
};

export default Comment;
