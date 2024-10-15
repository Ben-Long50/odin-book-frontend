const createComment = async (postId, commentId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}/comment`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ commentId }),
    });
    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default createComment;
