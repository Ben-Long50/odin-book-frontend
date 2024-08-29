import PerfectScrollbar from 'react-perfect-scrollbar';

const Notificationbar = (props) => {
  return (
    <PerfectScrollbar
      className={`${props.className} shadow-md-right bg-secondary flex h-dvh min-w-96 flex-col dark:shadow-gray-950`}
      style={props.style}
    >
      <div className="bg-secondary flex flex-col items-start gap-10 border-b p-6">
        <h1 className="text-primary text-3xl font-semibold">Notifications</h1>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-primary text-xl font-semibold">Recent</h3>
          <p className="hover:text-primary cursor-pointer text-lg text-blue-500">
            Clear all
          </p>
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Notificationbar;
