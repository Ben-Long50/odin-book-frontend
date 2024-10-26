import handleResponse from './handleResponse';

const setActiveProfile = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${profileId}`, {
      method: 'PUT',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default setActiveProfile;
