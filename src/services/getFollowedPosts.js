const getFollowedPosts = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${activeId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default getFollowedPosts;
