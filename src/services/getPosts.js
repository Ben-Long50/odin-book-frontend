import handleResponse from './handleResponse';

const getPosts = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}/posts`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.posts;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getPosts;
