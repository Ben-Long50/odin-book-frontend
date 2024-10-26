import handleResponse from './handleResponse';

const getUserProfiles = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.profiles;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getUserProfiles;
