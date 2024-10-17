import Icon from '@mdi/react';

const ListMenuItem = (props) => {
  return (
    <button
      className={`${props.className} text-secondary timing md:hover:bg-secondary-2 relative flex w-full items-center rounded-lg fill-current p-2`}
      onClick={props.onClick}
    >
      {props.children ? (
        props.children
      ) : (
        <Icon className="timing" path={props.icon} size={1.5} />
      )}

      {props.navbarSize && (
        <h2
          className={`flex items-center justify-start text-lg transition-all duration-300 ${
            props.navbarSize === 'medium'
              ? 'w-0 -translate-x-16 text-transparent'
              : 'w-[150px] translate-x-6'
          }`}
        >
          {props.label}
        </h2>
      )}
      {props.notifications?.length > 0 && (
        <div
          className={`${props.navbarSize === 'large' ? 'ml-auto size-7' : 'absolute right-1 top-1 size-5'} timing flex shrink-0 items-center justify-center rounded-full bg-red-600`}
        >
          <p
            className={`${props.navbarSize === 'large' ? 'text-xl' : 'text-sm'} text-primary`}
          >
            {props.notifications.length}
          </p>
        </div>
      )}
    </button>
  );
};

export default ListMenuItem;
