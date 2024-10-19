import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';
import { useContext, useEffect, useState } from 'react';
import Timestamp from './Timestamp';
import Comment from './Comment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GlobalContext } from './GlobalContext';
import RootPortal from '../layouts/RootPortal';
import PostHeader from './PostHeader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from './AuthContext';
import getComments from '../services/getComments';
import Loading from './Loading';

const PostDetail = (props) => {
  const [followStatus, setFollowStatus] = useState(props.followStatus || false);
  const [commentInput, setCommentInput] = useState('');
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile, activeFollowing } = useContext(GlobalContext);

  const comments = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      console.log('refetch');

      const comments = await getComments(props.post.id, apiUrl);
      return comments;
    },
    enabled: false,
  });

  const mutatePost = useMutation({
    mutationFn: () => {},
  });

  useEffect(() => {
    if (
      activeFollowing.includes(props.profile.id) ||
      activeProfile.id === props.profile.id
    ) {
      setFollowStatus(true);
    } else {
      setFollowStatus(false);
    }
  }, [activeFollowing, props.profile.id]);

  useEffect(() => {
    if (props.postOpen) {
      comments.refetch();
    }
  }, [props.postOpen, comments]);

  if (!props.postOpen) return null;

  if (comments.isPending || comments.isLoading) {
    return <Loading />;
  }

  return (
    <RootPortal
      onClick={() => props.togglePostOpen()}
      postOpen={props.postOpen}
    >
      <div
        className="fade-in-bottom bg-secondary main-layout z-30 grid h-dvh w-full md:m-auto md:grid md:h-auto md:max-h-dvh-95 md:min-h-dvh-75 md:max-w-7xl md:grid-cols-3 md:grid-rows-1 md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {props.layoutSize === 'small' || props.layoutSize === 'xsmall' ? (
          <>
            <div className="bg-secondary sticky top-0 z-30 row-span-1 w-full border-b">
              <PostHeader
                activeProfile={activeProfile}
                profile={props.profile}
                followStatus={followStatus}
                setFollowStatus={setFollowStatus}
                setFollowingStatus={props.setFollowingStatus}
              />
            </div>
            <div
              className="bg-secondary row-span-1 w-full overflow-y-auto"
              onScroll={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center overflow-hidden bg-black">
                <img
                  className="w-full self-center"
                  src={props.post.mediaUrl}
                  alt="post image"
                />
              </div>
              <div className="bg-secondary flex grow flex-col border-t">
                <Comment
                  profile={props.profile}
                  body={props.post.body}
                  date={props.post.createdAt}
                />
                {comments?.data.map((comment) => {
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
              </div>
            </div>
            <div className="bg-secondary sticky bottom-0 row-span-1 w-full border-t">
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
                    <p className="text-primary font-semibold">
                      {props.post.likes.length +
                        '  ' +
                        (props.post.likes.length === 1 ? 'like' : 'likes')}
                    </p>
                    <BookmarkButton />
                  </div>
                </div>
              </div>
              <form className="text-primary bg-secondary flex w-full items-center justify-between border-t p-3 md:rounded-br-xl">
                <input
                  className="w-full bg-transparent py-1 outline-none"
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
          </>
        ) : (
          <>
            <div className="flex h-full items-center justify-center overflow-hidden rounded-l-xl bg-black md:col-span-2 md:my-auto">
              <img
                className="w-full self-center md:rounded-l-xl"
                src={props.post.mediaUrl}
                alt="post image"
              />
            </div>
            <div className="bg-secondary col-span-1 flex h-full max-h-dvh-95 flex-col items-start justify-start rounded-r-xl">
              <PostHeader
                className="rounded-tr-xl border-b"
                activeProfile={activeProfile}
                profile={props.profile}
                followStatus={followStatus}
                setFollowStatus={setFollowStatus}
                setFollowingStatus={props.setFollowingStatus}
              />
              <PerfectScrollbar className="w-full overflow-y-auto">
                <div className="flex flex-col">
                  <Comment
                    profile={props.profile}
                    body={props.post.body}
                    date={props.post.createdAt}
                  />
                  {comments?.data.map((comment) => {
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
                </div>
              </PerfectScrollbar>
              <div className="bg-secondary sticky bottom-0 row-span-1 w-full border-t md:rounded-br-xl">
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
                      <BookmarkButton />
                    </div>
                  </div>

                  <p className="text-primary font-semibold">
                    {props.post.likes.length +
                      '  ' +
                      (props.post.likes.length === 1 ? 'like' : 'likes')}
                  </p>
                  <Timestamp date={props.post.createdAt} />
                </div>
                <form className="text-primary bg-secondary flex w-full items-center justify-between border-t p-3 md:rounded-br-xl">
                  <input
                    className="w-full bg-transparent py-1 outline-none"
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
          </>
        )}
      </div>
    </RootPortal>
  );
};

export default PostDetail;
