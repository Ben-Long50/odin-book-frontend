import handleResponse from './handleResponse';

const getExplorePosts = async (activeId, apiUrl) => {
  try {
    const response = await fetch(
      `${apiUrl}/explore/posts?activeId=${activeId}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const data = await handleResponse(response);
    return data.posts;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getExplorePosts;
