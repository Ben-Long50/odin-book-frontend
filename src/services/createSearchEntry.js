import handleResponse from './handleResponse';

const createSearchEntry = async (searchedId, activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/search/${searchedId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId }),
    });
    const data = await handleResponse(response);

    return data.search;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default createSearchEntry;
