import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import getProfiles from '../services/getProfiles.js';
import getActiveProfile from '../services/getActiveProfile.js';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const { apiUrl } = useContext(AuthContext);
  const profiles = useQuery({
    queryKey: ['profiles'],
    queryFn: () => getProfiles(apiUrl),
  });
  const { data: activeProfile } = useQuery({
    queryKey: ['activeProfile'],
    queryFn: () => getActiveProfile(apiUrl),
  });

  return (
    <GlobalContext.Provider
      value={{
        profiles,
        activeProfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
