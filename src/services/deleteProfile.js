const deleteProfile = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(data.message);
    } else {
      console.log(data.message);
      return data;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default deleteProfile;
