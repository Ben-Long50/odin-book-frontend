const getFollows = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}/follows`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default getFollows;
