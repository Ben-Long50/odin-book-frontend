const getServerStatus = async (apiUrl) => {
  console.log('Fetching server status');
  try {
    const response = await fetch(`${apiUrl}/status`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    } else if (response.ok) {
      console.log(data.message);
      return true;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getServerStatus;
