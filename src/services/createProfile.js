const createProfile = async (profileData, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default createProfile;
