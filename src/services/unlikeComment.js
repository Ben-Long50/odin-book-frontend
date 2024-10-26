import handleResponse from './handleResponse';

const unlikeComment = async (commentId, activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/comments/${commentId}/like`, {
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

export default unlikeComment;
