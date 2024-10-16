const getUserProfiles = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data.message);

    return data.profiles;
  } catch (error) {
    console.error(error.message);
  }
};

export default getUserProfiles;
