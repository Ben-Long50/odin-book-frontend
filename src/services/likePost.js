import handleResponse from './handleResponse';

const likePost = async (postId, activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}/likes`, {
      method: 'POST',
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

export default likePost;
