const createComment = async (postId, profileId, activeId, comment, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ activeId, profileId, comment }),
    });
    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default createComment;
