import handleResponse from './handleResponse';

const deletePost = async (postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
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

export default deletePost;
