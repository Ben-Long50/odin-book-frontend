import handleResponse from './handleResponse';

const deleteSearchEntry = async (searchedId, activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/search/${searchedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId }),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default deleteSearchEntry;
