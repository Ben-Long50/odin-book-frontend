import { mdiMagnify } from '@mdi/js';
import ListMenuItem from './ListMenuItem';
import Icon from '@mdi/react';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/custom-scrollbar.css';

const Search = () => {
  const [activeItem, setActiveItem] = useState('all');

  const changeActiveItem = (item) => {
    setActiveItem(item);
  };

  return (
    <PerfectScrollbar className="overflow-y-auto">
      <div className="text-primary layout-cols center grid p-4 md:p-6 lg:p-8">
        <search className="focus bg-secondary-2 shadow-normal col-start-2 col-end-3 flex w-full items-center justify-self-center rounded-full pl-3 pr-2">
          <input
            className="grow bg-transparent py-2 text-xl outline-none"
            type="text"
            placeholder="Search..."
          />
          <Icon
            className="shrink-0 cursor-pointer rounded-full"
            path={mdiMagnify}
            size={1.5}
          />
        </search>
        <div className="col-start-2 col-end-3 flex w-full items-center justify-center justify-self-center">
          <ListMenuItem
            className="grow border-gray-700 text-xl"
            title="All"
            label="all"
            activeItem={activeItem}
            onClick={() => changeActiveItem('all')}
          />
          <ListMenuItem
            className="grow border-gray-700 text-xl"
            title="Posts"
            label="posts"
            activeItem={activeItem}
            onClick={() => changeActiveItem('posts')}
          />
          <ListMenuItem
            className="grow border-gray-700 text-xl"
            title="Profiles"
            label="profiles"
            activeItem={activeItem}
            onClick={() => changeActiveItem('profiles')}
          />
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Search;
