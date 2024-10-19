const deleteComment = async (commentId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/comment/${commentId}`, {
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

export default deleteComment;
