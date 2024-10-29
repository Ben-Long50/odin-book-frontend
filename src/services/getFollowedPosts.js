import handleResponse from './handleResponse';

const getFollowedPosts = async (activeId, apiUrl, pageParam) => {
  try {
    const response = await fetch(
      `${apiUrl}/posts/${activeId}?page=${pageParam}`,
      {
        method: 'GET',
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

export default getFollowedPosts;
