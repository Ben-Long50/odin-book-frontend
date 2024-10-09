const getActiveProfile = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data.message);

    return data.activeProfile;
  } catch (error) {
    console.error(error.message);
  }
};

export default getActiveProfile;
