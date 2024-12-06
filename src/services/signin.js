import handleResponse from './handleResponse';

const signin = async (formData, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default signin;
