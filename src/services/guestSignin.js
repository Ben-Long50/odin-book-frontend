import handleResponse from './handleResponse';

const guestSignin = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/signin/guest`, {
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

export default guestSignin;
