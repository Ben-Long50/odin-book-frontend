import { mdiCircleSmall, mdiDotsHorizontal } from '@mdi/js';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import ProfilePic from './ProfilePic';
import PostDetail from './PostDetail';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import Timestamp from './Timestamp';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import likePost from '../services/likePost';
import unlikePost from '../services/unlikePost';

const Post = (props) => {
  const [likedStatus, setLikedStatus] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [postOpen, setPostOpen] = useState(false);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
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

  const togglePostOpen = () => {
    setPostOpen(!postOpen);
  };

  return (
    <>
      <div className="bg-secondary flex max-w-xl flex-col border-b">
        <div className="flex items-center justify-between px-2 py-3 sm:px-0 sm:py-4">
          <div className="flex items-center">
            <Link
              to={`/profile/${props.post.profile.username}`}
              state={props.post.profile}
            >
              <ProfilePic
                image={props.post.profile.profilePicUrl}
                className="mr-4 size-10 md:mr-6"
              />
            </Link>
            <div className="flex items-center">
              <Link
                to={`/profile/${props.post.profile.username}`}
                state={props.post.profile}
              >
                <h3 className="text-lg font-semibold">
                  {props.post.profile.username}
                </h3>
              </Link>
              <Icon path={mdiCircleSmall} size={1} />
              <Timestamp date={props.post.createdAt} />
            </div>
          </div>
          <Icon path={mdiDotsHorizontal} size={1.2} />
        </div>
        <img className="-mx-4 self-center" src={props.post.mediaUrl} />
        <div className="flex flex-col gap-3 px-4 py-4 sm:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <div className="flex items-center gap-2">
                <LikeButton
                  likedStatus={likedStatus}
                  onClick={() => toggleLikedStatus.mutate()}
                />
                <p className="text-primary">{props.post.likes.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <CommentButton togglePostOpen={togglePostOpen} />
                <p>{props.post.comments.length}</p>
              </div>
              <ShareButton />
            </div>
            <BookmarkButton />
          </div>
          <p>{props.post.body}</p>
          <form className="flex items-center justify-between">
            <input
              className="bg-transparent py-1 outline-none"
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setCommentInput(e.target.value)}
            />
            {commentInput.length > 0 && (
              <button
                type="submit"
                className="text-accent font-semibold hover:underline"
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>
      <PostDetail
        post={props.post}
        profile={props.post.profile}
        layoutSize={props.layoutSize}
        likedStatus={likedStatus}
        toggleLikedStatus={toggleLikedStatus}
        postOpen={postOpen}
        followStatus={true}
        togglePostOpen={togglePostOpen}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
      />
    </>
  );
};

export default Post;
