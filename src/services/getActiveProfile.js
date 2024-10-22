const getActiveProfile = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return data.activeProfile;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getActiveProfile;
