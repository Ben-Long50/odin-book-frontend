import handleResponse from './handleResponse';

const createPost = async (postData, activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts`, {
      method: 'POST',
      credentials: 'include',
      body: postData,
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createPost;
