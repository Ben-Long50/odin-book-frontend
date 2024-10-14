const getPostLikes = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${profileId}/like`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default getPostLikes;
