const getProfiles = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default getProfiles;
