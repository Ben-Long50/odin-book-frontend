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
    if (response.ok) {
      console.log(data.message);
      return data.posts;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getExplorePosts;
