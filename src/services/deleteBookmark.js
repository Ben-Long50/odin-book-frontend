const deleteBookmark = async (activeId, postId, apiUrl) => {
  try {
    const response = await fetch(
      `${apiUrl}/profiles/${activeId}/bookmarks/${postId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
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

export default deleteBookmark;
