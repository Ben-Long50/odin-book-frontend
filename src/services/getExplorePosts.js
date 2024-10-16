const getExplorePosts = async (activeId, apiUrl) => {
  try {
    const response = await fetch(
      `${apiUrl}/explore/posts?activeId=${activeId}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const data = await response.json();

    return data.posts;
  } catch (error) {
    console.error(error.message);
  }
};

export default getExplorePosts;
