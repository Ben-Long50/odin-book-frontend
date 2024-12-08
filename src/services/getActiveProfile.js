import handleResponse from './handleResponse';

const getActiveProfile = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/active`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.activeProfile;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getActiveProfile;
