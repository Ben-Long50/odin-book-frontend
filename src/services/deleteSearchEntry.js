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
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default deleteSearchEntry;
