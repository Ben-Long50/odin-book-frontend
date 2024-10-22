const getComments = async (postId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/post/${postId}/comments`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return data.comments;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getComments;
