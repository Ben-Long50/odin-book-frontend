import handleResponse from './handleResponse';

const getNotifications = async (activeId, apiUrl) => {
  try {
    const response = await fetch(
      `${apiUrl}/profiles/${activeId}/notifications`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const data = await handleResponse(response);
    return data.notifications;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getNotifications;
