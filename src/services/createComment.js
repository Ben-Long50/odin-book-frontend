import handleResponse from './handleResponse';

const createComment = async (postId, profileId, activeId, comment, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId, profileId, comment }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createComment;
