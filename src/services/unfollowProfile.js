import handleResponse from './handleResponse';

const unfollowProfile = async (activeId, profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${profileId}/follows`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default unfollowProfile;
