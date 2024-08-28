import { mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';

const Searchbar = (props) => {
  return (
    <search
      className={`${props.className} shadow-medium bg-secondary flex h-dvh min-w-96 flex-col rounded-br-2xl rounded-tr-2xl`}
    >
      <div className="bg-secondary flex flex-col items-start gap-10 border-b p-6">
        <h1 className="text-primary text-3xl font-semibold">Search</h1>
        <div className="bg-secondary-2 flex w-full items-center justify-between rounded-lg p-2">
          <input
            className="text-secondary grow border-none bg-transparent text-lg outline-none"
            type="text"
            placeholder="Search"
          />
          <Icon path={mdiCloseCircle} size={1} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-primary text-xl font-semibold">Recent</h3>
          <p className="hover:text-primary cursor-pointer text-lg text-blue-500">
            Clear all
          </p>
        </div>
      </div>
    </search>
  );
};

export default Searchbar;
