const getAuthStatus = async (apiUrl) => {
  console.log('Refetching auth status');
  try {
    const response = await fetch(`${apiUrl}/auth/status`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.message);
    return true;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getAuthStatus;
