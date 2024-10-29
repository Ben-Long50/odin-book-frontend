import handleResponse from './handleResponse';

const deleteAccount = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default deleteAccount;
