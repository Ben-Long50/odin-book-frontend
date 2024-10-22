import { useContext } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GlobalContext } from './GlobalContext';
import Notification from './Notification';
import { AuthContext } from './AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteAllNotifications from '../services/deleteAllNotifications';

const Notificationbar = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile, notifications } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const mutateNotifications = useMutation({
    mutationFn: async () =>
      await deleteAllNotifications(activeProfile.id, apiUrl),
    onSuccess: () => queryClient.invalidateQueries(['activeProfile']),
  });

  return (
    <PerfectScrollbar
      className={`${props.className} bg-secondary flex max-h-dvh-50 min-w-96 flex-col overflow-y-auto shadow-md md:h-dvh md:max-h-full md:shadow-md-right dark:shadow-gray-950`}
      style={props.style}
    >
      {props.layoutSize !== 'xsmall' && props.layoutSize !== 'small' && (
        <div className="bg-secondary flex flex-col items-start gap-10 border-b p-6">
          <h1 className="text-primary text-3xl font-semibold">Notifications</h1>
        </div>
      )}

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-primary text-xl font-semibold">Recent</h3>
          <p
            className="md:hover:text-primary cursor-pointer text-lg text-blue-500"
            onClick={() => {
              mutateNotifications.mutate();
              props.toggleNotificationbar();
            }}
          >
            Clear all
          </p>
        </div>
        {notifications?.length > 0 &&
          notifications.map((notification) => {
            return (
              <Notification
                key={notification.id}
                notification={notification}
                profile={notification.profile}
                date={notification.createdAt}
                toggleNotificationbar={props.toggleNotificationbar}
              />
            );
          })}
      </div>
    </PerfectScrollbar>
  );
};

export default Notificationbar;
