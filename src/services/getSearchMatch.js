const getSearchMatch = async (searchQuery, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/search/${searchQuery}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    return data.profiles;
  } catch (error) {
    console.error(error.message);
  }
};

export default getSearchMatch;
