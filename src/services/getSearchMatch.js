const getSearchMatch = async (searchQuery, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/search/${searchQuery}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return data.profiles;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getSearchMatch;
