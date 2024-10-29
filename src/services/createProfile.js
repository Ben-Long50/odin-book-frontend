import handleResponse from './handleResponse';

const createProfile = async (profileData, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profile`, {
      method: 'POST',
      credentials: 'include',
      body: profileData,
    });
    const data = await handleResponse(response);
    console.log(data);

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createProfile;
