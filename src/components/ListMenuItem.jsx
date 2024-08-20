import Icon from '@mdi/react';

const ListMenuItem = (props) => {
  return (
    <button
      className={`${props.className} text-secondary flex cursor-pointer items-center justify-center ${props.activeItem === props.label && 'border-emerald-300 dark:border-emerald-300'} timing border-b-4 border-transparent fill-current px-2`}
      onClick={props.onClick}
    >
      {props.icon ? (
        <Icon
          className={`timing ${props.activeItem === props.label && 'translate-y-0 dark:translate-y-0'} translate-y-0.5`}
          path={props.icon}
          size={2}
        />
      ) : (
        <h2 className="py-3">{props.title}</h2>
      )}
    </button>
  );
};

export default ListMenuItem;
