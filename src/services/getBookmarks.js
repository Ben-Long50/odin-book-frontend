const getBookmarks = async (activeId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${activeId}/bookmarks`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return data.bookmarks;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getBookmarks;
