import Icon from '@mdi/react';
import { mdiShareOutline } from '@mdi/js';

const ShareButton = () => {
  return (
    <button className="text-primary">
      <Icon path={mdiShareOutline} size={1.4} />
    </button>
  );
};

export default ShareButton;
