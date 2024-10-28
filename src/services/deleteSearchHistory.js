import handleResponse from './handleResponse';

const deleteSearchHistory = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/searches/${activeId}`, {
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

export default deleteSearchHistory;
