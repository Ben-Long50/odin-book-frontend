import handleResponse from './handleResponse';

const createBookmark = async (activeId, postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${activeId}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ postId }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createBookmark;
