const getProfile = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    return data.profile;
  } catch (error) {
    console.error(error.message);
  }
};

export default getProfile;
