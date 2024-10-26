import handleResponse from './handleResponse';

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
      const data = await handleResponse(response);
      return data.status;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getFollowStatus;
