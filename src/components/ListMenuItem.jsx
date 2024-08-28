import Icon from '@mdi/react';

const ListMenuItem = (props) => {
  return (
    <button
      className={`${props.className} text-secondary timing hover:bg-secondary-2 flex w-full items-center gap-6 rounded-lg fill-current p-2`}
      onClick={props.onClick}
    >
      <Icon className="timing" path={props.icon} size={1.5} />
      <h2 className="hidden text-lg xl:block">{props.label}</h2>
    </button>
  );
};

export default ListMenuItem;
