const getAuthStatus = async (apiUrl) => {
  try {
    const response = await fetch(`${apiUrl}/auth/status`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return true;
    } else {
      console.error(data.message);
      return false;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default getAuthStatus;
