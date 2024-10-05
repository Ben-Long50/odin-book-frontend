const createProfile = async (profileData, apiUrl) => {
  const response = await fetch(`${apiUrl}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(profileData),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error('Failed to create profile');
    error.response = data;
    throw error;
  }
  return data;
};

export default createProfile;
