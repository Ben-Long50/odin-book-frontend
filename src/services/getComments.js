import handleResponse from './handleResponse';

const getComments = async (postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.comments;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getComments;
