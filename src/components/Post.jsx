import { mdiCommentOutline, mdiHeartOutline } from '@mdi/js';
import Icon from '@mdi/react';

const Post = (props) => {
  return (
    <div className="shadow-normal bg-secondary-2 flex max-w-xl flex-col rounded-lg">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{props.post.author}</h3>
      </div>
      <img
        className="-mx-4 aspect-square self-center"
        src={props.post.imgUrl}
      />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-start gap-4">
          <div className="flex items-center gap-2">
            <button>
              <Icon path={mdiHeartOutline} size={1.25} />
            </button>
            <p>{props.post.likes.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <button>
              <Icon path={mdiCommentOutline} size={1.25} />
            </button>
            <p>{props.post.comments.length}</p>
          </div>
        </div>
        <p>{props.post.body}</p>
        <input
          className="bg-secondary focus rounded-full px-3 py-1"
          type="text"
          placeholder="Add a comment"
        />
      </div>
    </div>
  );
};

export default Post;
