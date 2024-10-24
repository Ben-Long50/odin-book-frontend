const setActiveProfile = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${profileId}`, {
      method: 'PUT',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default setActiveProfile;
