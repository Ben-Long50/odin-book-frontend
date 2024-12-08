import handleResponse from './handleResponse';

const deleteComment = async (commentId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/comments/${commentId}`, {
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

export default deleteComment;
