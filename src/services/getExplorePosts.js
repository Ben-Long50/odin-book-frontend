import handleResponse from './handleResponse';

const getExplorePosts = async (activeId, apiUrl, pageParam) => {
  try {
    const response = await fetch(
      `${apiUrl}/posts/explore?activeId=${activeId}&page=${pageParam}`,
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

export default getExplorePosts;
