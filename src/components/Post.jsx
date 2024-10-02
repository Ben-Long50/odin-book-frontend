import { mdiCircleSmall, mdiDotsHorizontal } from '@mdi/js';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { useState } from 'react';
import ProfilePic from './ProfilePic';
import PostDetail from './PostDetail';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';

const Post = (props) => {
  const [commentInput, setCommentInput] = useState('');
  const [following, setFollowing] = useState(false);
  const [postOpen, setPostOpen] = useState(false);

  const togglePostOpen = () => {
    setPostOpen(!postOpen);
  };

  return (
    <>
      <div className="bg-secondary flex max-w-xl flex-col border-b">
        <div className="flex items-center justify-between px-2 py-3 sm:px-0 sm:py-4">
          <div className="flex items-center">
            <Link to={`/profile/${props.post.author}`}>
              <ProfilePic className="mr-4 size-10 md:mr-6" />
            </Link>
            <div className="flex items-center">
              <Link to={`/profile/${props.post.author}`}>
                <h3 className="text-lg font-semibold">{props.post.author}</h3>
              </Link>
              <Icon path={mdiCircleSmall} size={1} />
              <p className="text-tertiary">3d</p>
              {!following && (
                <>
                  <Icon path={mdiCircleSmall} size={1} />
                  <button
                    className="text-accent"
                    onClick={() => setFollowing(true)}
                  >
                    Follow
                  </button>
                </>
              )}
            </div>
          </div>

          <Icon path={mdiDotsHorizontal} size={1.2} />
        </div>
        <img
          className="-mx-4 aspect-square self-center"
          src={props.post.imgUrl}
        />
        <div className="flex flex-col gap-3 px-4 py-4 sm:px-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <div className="flex items-center gap-2">
                <LikeButton />
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
        layoutSize={props.layoutSize}
        following={following}
        setFollowing={setFollowing}
        postOpen={postOpen}
        togglePostOpen={togglePostOpen}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
      />
    </>
  );
};

export default Post;
