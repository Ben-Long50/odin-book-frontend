import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { createPortal } from 'react-dom';

const RootPortal = (props) => {
  const portalRoot = document.getElementById('portal-root');

  return createPortal(
    <div
      className={`${props.className} absolute inset-0 z-20 flex items-center bg-black bg-opacity-75 sm:p-4 md:p-8`}
      onClick={props.onClick}
    >
      {props.children}
      <button
        className="text-primary absolute right-0 top-0 z-30 p-2"
        onClick={props.onClick}
      >
        <Icon path={mdiClose} size={1.3} />
      </button>
    </div>,
    portalRoot,
  );
};

export default RootPortal;
