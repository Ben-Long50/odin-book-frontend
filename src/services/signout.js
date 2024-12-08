import handleResponse from './handleResponse';

const signout = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/auth/signout`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default signout;
