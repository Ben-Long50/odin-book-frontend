const getNotifications = async (activeId, apiUrl) => {
  try {
    const response = await fetch(
      `${apiUrl}/profiles/${activeId}/notifications`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return data.notifications;
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getNotifications;
