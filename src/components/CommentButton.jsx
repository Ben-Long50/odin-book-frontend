import Icon from '@mdi/react';
import { mdiCommentOutline } from '@mdi/js';

const CommentButton = (props) => {
  return (
    <button className="text-primary" onClick={props.togglePostOpen}>
      <Icon path={mdiCommentOutline} size={1.25} />
    </button>
  );
};

export default CommentButton;
