import { mdiCommentOutline, mdiDotsHorizontal, mdiHeartOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import ProfilePic from './ProfilePic';

const Post = (props) => {
  const [commentVisibility, setCommentVisibility] = useState(false);

  return (
    <div className="bg-secondary flex max-w-xl flex-col border-b">
      <div className="flex items-center justify-between px-2 py-3 sm:px-0 sm:py-4">
        <div className="flex items-center gap-4 md:gap-6">
          <ProfilePic className="size-10" />
          <h3 className="text-lg font-semibold">{props.post.author}</h3>
        </div>
        <Icon path={mdiDotsHorizontal} size={1.2} />
      </div>
      <img
        className="-mx-4 aspect-square self-center"
        src={props.post.imgUrl}
      />
      <div className="flex flex-col gap-3 px-4 py-4 sm:px-0">
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center gap-2">
            <button>
              <Icon path={mdiHeartOutline} size={1.25} />
            </button>
            <p>{props.post.likes.length}</p>
          </div>
          <button
            className="flex items-center gap-2"
            onClick={() => setCommentVisibility(!commentVisibility)}
          >
            <Icon path={mdiCommentOutline} size={1.25} />
            <p>{props.post.comments.length}</p>
          </button>
        </div>
        <p>{props.post.body}</p>
        <input
          className="bg-transparent py-1 outline-none"
          type="text"
          placeholder="Add a comment..."
        />
        {commentVisibility &&
          props.post.comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
      </div>
    </div>
  );
};

export default Post;
