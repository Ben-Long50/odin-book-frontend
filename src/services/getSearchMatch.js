import handleResponse from './handleResponse';

const getSearchMatch = async (searchQuery, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/search/${searchQuery}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await handleResponse(response);
    return data.profiles;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getSearchMatch;
