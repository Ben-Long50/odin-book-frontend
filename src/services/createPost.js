const createPost = async (postData, activeId, apiUrl) => {
  try {
    console.log(postData, activeId);

    const response = await fetch(`${apiUrl}/profile/${activeId}/post`, {
      method: 'POST',
      credentials: 'include',
      body: postData,
    });
    const data = await response.json();
    console.log(data.message);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default createPost;
