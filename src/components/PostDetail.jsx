import Icon from '@mdi/react';
import { mdiClose, mdiCircleSmall } from '@mdi/js';
import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Timestamp from './Timestamp';
import Comment from './Comment';
import PerfectScrollbar from 'react-perfect-scrollbar';

const PostDetail = (props) => {
  const [commentInput, setCommentInput] = useState('');

  if (!props.postOpen) return null;

  const portalRoot = document.getElementById('portal-root');

  return createPortal(
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-75 sm:p-4 md:p-8">
      <div
        className="fade-in-bottom bg-secondary-2 z-30 mx-auto flex h-dvh max-w-7xl flex-col bg-black md:grid md:h-auto md:max-h-dvh-95 md:grid-cols-3"
        onClick={(e) => e.stopPropagation()}
      >
        {(props.layoutSize === 'small' || props.layoutSize === 'xsmall') && (
          <div className="bg-secondary flex items-center p-4">
            <Link
              to={`/profile/${props.profile.username}`}
              state={props.profile}
            >
              <ProfilePic
                image={props.profile.profilePicUrl}
                className="mr-4 size-10"
              />
            </Link>
            <div className="text-primary flex items-center">
              <Link
                to={`/profile/${props.profile.username}`}
                state={props.profile}
              >
                <h3 className="text-lg font-semibold">
                  {props.profile.username}
                </h3>
              </Link>
              {props.followStatus === false && (
                <>
                  <Icon path={mdiCircleSmall} size={1} />
                  <button
                    className="text-accent"
                    onClick={() => props.setFollowingStatus()}
                  >
                    Follow
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        <div className="col-span-2 my-auto flex aspect-square items-center justify-center">
          <img
            className="w-full self-center"
            src={props.post.mediaUrl}
            alt="post image"
          />
        </div>
        <div className="bg-secondary col-span-1 flex flex-col items-start justify-start md:max-h-dvh-95">
          {props.layoutSize !== 'small' && props.layoutSize !== 'xsmall' && (
            <>
              <div className="flex items-center p-4">
                <Link
                  to={`/profile/${props.profile.username}`}
                  state={props.profile}
                >
                  <ProfilePic
                    image={props.profile.profilePicUrl}
                    className="mr-4 size-10"
                  />
                </Link>
                <div className="text-primary flex items-center">
                  <Link
                    to={`/profile/${props.profile.username}`}
                    state={props.profile}
                  >
                    <h3 className="text-lg font-semibold">
                      {props.profile.username}
                    </h3>
                  </Link>
                  {!props.followStatus && (
                    <>
                      <Icon path={mdiCircleSmall} size={1} />
                      <button
                        className="text-accent"
                        onClick={() => props.setFollowingStatus.mutate()}
                      >
                        Follow
                      </button>
                    </>
                  )}
                </div>
              </div>
              <hr className="text-tertiary w-full self-center" />
            </>
          )}

          <PerfectScrollbar className="flex w-full flex-col gap-4 overflow-y-scroll p-4">
            <Comment
              profile={props.profile}
              body={props.post.body}
              date={props.post.createdAt}
            />
            {props.post.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  likes={comment.likes}
                  profile={comment.profile}
                  body={comment.body}
                  date={comment.createdAt}
                />
              );
            })}
          </PerfectScrollbar>

          <hr className="text-tertiary mt-auto w-full self-center" />
          <div className="w-full p-3">
            <div className="flex w-full items-center justify-between md:mb-3">
              <div className="flex items-center justify-start gap-4">
                <LikeButton
                  likedStatus={props.likedStatus}
                  onClick={() => props.toggleLikedStatus.mutate()}
                />
                <CommentButton />
                <ShareButton />
              </div>
              <div className="flex items-center gap-2">
                {(props.layoutSize === 'small' ||
                  props.layoutSize === 'xsmall') && (
                  <p className="text-primary font-semibold">3 likes</p>
                )}
                <BookmarkButton />
              </div>
            </div>

            {props.layoutSize !== 'small' && props.layoutSize !== 'xsmall' && (
              <>
                <p className="text-primary font-semibold">
                  {props.post.likes.length} likes
                </p>
                <Timestamp date={props.post.createdAt} />
              </>
            )}
          </div>
          <hr className="text-tertiary w-full self-center" />
          <form className="text-primary flex w-full items-center justify-between p-3">
            <input
              className="bg-transparent py-1 outline-none"
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentInput}
            />
            {commentInput.length > 0 && (
              <button
                className="text-accent font-semibold hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  props.comment.mutate(commentInput);
                  setCommentInput('');
                }}
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>

      <button
        className="text-primary absolute right-0 top-0 z-30 p-2"
        onClick={() => props.togglePostOpen()}
      >
        <Icon path={mdiClose} size={1.3} />
      </button>
    </div>,
    portalRoot,
  );
};

export default PostDetail;
