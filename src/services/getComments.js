const getComments = async (postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/post/${postId}/comments`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data.message);

    return data.comments;
  } catch (error) {
    console.error(error.message);
  }
};

export default getComments;
