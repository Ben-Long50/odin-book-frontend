const handleResponse = async (response) => {
  const data = await response.json();
  if (response.status === 401) {
    throw new Error(`${data.message}. Sign in to complete this action`);
  } else if (response.status === 500) {
    throw new Error(`An unexpected error occured: ${data.message}`);
  }
  return data;
};

export default handleResponse;
