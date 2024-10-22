const getAuthStatus = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/auth/status`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
    return data.status;
  } catch (error) {
    console.error(error.message);
  }
};

export default getAuthStatus;
