import PerfectScrollbar from 'react-perfect-scrollbar';
import { Outlet } from 'react-router-dom';

const ContentLayout = () => {
  return (
    <PerfectScrollbar className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 justify-center p-4 md:p-6 lg:p-8">
        <Outlet />
      </div>
    </PerfectScrollbar>
  );
};

export default ContentLayout;
