import handleResponse from './handleResponse';

const getBookmarks = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${activeId}/bookmarks`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.bookmarks;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getBookmarks;
