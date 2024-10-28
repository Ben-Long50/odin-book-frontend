import handleResponse from './handleResponse';

const deleteProfile = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default deleteProfile;
