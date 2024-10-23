const getFollowStatus = async (activeId, profileId, apiUrl) => {
  try {
    if (Number(activeId) === Number(profileId)) {
      return true;
    } else {
      const response = await fetch(
        `${apiUrl}/profile/${activeId}/follows/${profileId}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        return data.status;
      } else {
        console.error(data.message);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getFollowStatus;
