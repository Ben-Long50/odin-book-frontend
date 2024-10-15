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
    const data = await response.json();
    console.log(data.message);
    return data.search;
  } catch (error) {
    console.error(error.message);
  }
};

export default createSearchEntry;
