const followProfile = async (activeId, profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId }),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error(error.message);
  }
};

export default followProfile;
