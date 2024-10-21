const deletePost = async (postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default deletePost;
