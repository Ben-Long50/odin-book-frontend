import handleResponse from './handleResponse';

const editAccount = async (formData, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    });
    const data = await handleResponse(response);

    if (!response.ok) {
      return data;
    }
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default editAccount;
