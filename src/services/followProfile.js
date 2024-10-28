import handleResponse from './handleResponse';

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
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default followProfile;
