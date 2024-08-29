import Icon from '@mdi/react';

const ListMenuItem = (props) => {
  return (
    <button
      className={`${props.className} text-secondary timing hover:bg-secondary-2 flex w-full items-center rounded-lg fill-current p-2`}
      onClick={props.onClick}
    >
      <Icon className="timing" path={props.icon} size={1.5} />
      <h2
        className={`flex items-center justify-start text-lg transition-all duration-300 ${
          props.navbarSize === 'medium'
            ? 'w-0 -translate-x-16 text-transparent'
            : 'w-[150px] translate-x-6'
        }`}
      >
        {props.label}
      </h2>
    </button>
  );
};

export default ListMenuItem;
