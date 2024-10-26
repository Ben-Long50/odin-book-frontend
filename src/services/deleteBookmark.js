import handleResponse from './handleResponse';

const deleteBookmark = async (activeId, postId, apiUrl) => {
  try {
    const response = await fetch(
      `${apiUrl}/profiles/${activeId}/bookmarks/${postId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default deleteBookmark;
