const unfollowProfile = async (activeId, profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}/follow`, {
      method: 'DELETE',
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

export default unfollowProfile;
