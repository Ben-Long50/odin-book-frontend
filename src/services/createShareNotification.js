import handleResponse from './handleResponse';

const createShareNotification = async (shareList, activeId, postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId, postId, shareList }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createShareNotification;
