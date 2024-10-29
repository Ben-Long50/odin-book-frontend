import handleResponse from './handleResponse';

const getAccount = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);

    return data.user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getAccount;
