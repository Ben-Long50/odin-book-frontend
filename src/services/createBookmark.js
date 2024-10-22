const createBookmark = async (activeId, postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/profiles/${activeId}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ postId }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default createBookmark;
