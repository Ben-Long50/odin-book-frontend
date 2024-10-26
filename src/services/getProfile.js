import handleResponse from './handleResponse';

const getProfile = async (profileId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile/${profileId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.profile;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getProfile;
