const getSearchHistory = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/searches/${activeId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return data.searches;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getSearchHistory;
