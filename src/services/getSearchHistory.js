import handleResponse from './handleResponse';

const getSearchHistory = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${activeId}/searches`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.searches;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getSearchHistory;
