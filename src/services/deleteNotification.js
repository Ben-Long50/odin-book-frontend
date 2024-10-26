import handleResponse from './handleResponse';

const deleteNotification = async (notificationId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/notifications/${notificationId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default deleteNotification;
