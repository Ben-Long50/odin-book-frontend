import handleResponse from './handleResponse';

const deleteAllNotifications = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/notifications`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default deleteAllNotifications;
