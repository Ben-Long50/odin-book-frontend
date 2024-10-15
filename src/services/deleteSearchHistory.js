const deleteSearchHistory = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/searches/${activeId}`, {
      method: 'DELETE',
      credentials: 'include',
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

export default deleteSearchHistory;
