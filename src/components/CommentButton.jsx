import Icon from '@mdi/react';
import { mdiCommentOutline } from '@mdi/js';

const CommentButton = (props) => {
  return (
    <button
      aria-label="Comment on post"
      className="text-primary"
      onClick={props.onClick}
    >
      <Icon path={mdiCommentOutline} size={1.25} />
    </button>
  );
};

export default CommentButton;
