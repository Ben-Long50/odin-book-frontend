const getSearchHistory = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/searches/${activeId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data.message);

    return data.searches;
  } catch (error) {
    console.error(error.message);
  }
};

export default getSearchHistory;
