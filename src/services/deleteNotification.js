const deleteNotification = async (notificationId, apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/notifications/${notificationId}`, {
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

export default deleteNotification;
