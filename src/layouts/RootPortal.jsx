import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const RootPortal = (props) => {
  const portalRoot = document.getElementById('portal-root');

  useEffect(() => {
    const handlePopstate = (e) => {
      if (props.modalOpen) {
        e.preventDefault();
        props.onClick();
      }
    };

    if (props.modalOpen) {
      history.pushState(null, null, window.location.href);
    }

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [props.modalOpen]);

  return createPortal(
    <div
      className={`${props.className} backdrop-fade fixed inset-0 z-20 flex min-h-dvh items-center overflow-auto bg-black bg-opacity-75 sm:p-4 md:p-8`}
      onClick={props.onClick}
    >
      {props.children}
      {!props.create && (
        <button
          className="text-primary absolute right-0 top-0 z-30 p-2"
          onClick={props.onClick}
        >
          <Icon className={props.className} path={mdiClose} size={1.3} />
        </button>
      )}
    </div>,
    portalRoot,
  );
};

export default RootPortal;
