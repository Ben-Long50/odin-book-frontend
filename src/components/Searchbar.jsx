import { mdiClose, mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import getSearchMatch from '../services/getSearchMatch';
import { GlobalContext } from './GlobalContext';
import getSearchHistory from '../services/getSearchHistory';
import createSearchEntry from '../services/createSearchEntry';
import Loading from './Loading';
import deleteSearchEntry from '../services/deleteSearchEntry';
import deleteSearchHistory from '../services/deleteSearchHistory';
import ProfileCard from './ProfileCard';

const Searchbar = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const searchHistory = useQuery({
    queryKey: ['searchHistory'],
    queryFn: async () => {
      const searches = await getSearchHistory(activeProfile.id, apiUrl);
      return searches;
    },
  });

  const searchResults = useMutation({
    mutationFn: async () => {
      const result = await getSearchMatch(searchQuery, apiUrl);
      result ? setResults(result) : setResults([]);
    },
  });

  const createSearch = useMutation({
    mutationFn: async (searchedId) => {
      return await createSearchEntry(searchedId, activeProfile.id, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['searchHistory']);
    },
  });

  const deleteSearch = useMutation({
    mutationFn: async (searchedId) => {
      return await deleteSearchEntry(searchedId, activeProfile.id, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['searchHistory']);
    },
  });

  const deleteSearches = useMutation({
    mutationFn: async () => {
      await deleteSearchHistory(activeProfile.id, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['searchHistory']);
    },
  });

  return (
    <search
      className={`${props.className} bg-secondary flex w-full flex-col shadow-md md:h-dvh md:min-w-96 md:shadow-md-right dark:shadow-gray-950`}
      style={props.style}
    >
      <div className="bg-secondary flex flex-col items-start gap-10 border-b p-6">
        {props.layoutSize !== 'xsmall' && props.layoutSize !== 'small' && (
          <h1 className="text-primary text-3xl font-semibold">Search</h1>
        )}
        <div className="bg-secondary-2 flex w-full items-center justify-between rounded-lg p-2">
          <input
            className="text-secondary grow border-none bg-transparent text-lg outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchResults.mutate();
            }}
            value={searchQuery}
          />
          <button
            className="text-tertiary cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setSearchQuery('');
              setResults([]);
            }}
          >
            <Icon path={mdiCloseCircle} size={1} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {results.length < 1 ? (
          <>
            <div className="flex items-center justify-between p-2">
              <h3 className="text-primary text-xl font-semibold">Recent</h3>
              <p
                className="timing hover:text-primary cursor-pointer text-lg text-blue-500"
                onClick={() => deleteSearches.mutate()}
              >
                Clear all
              </p>
            </div>
            {searchHistory.isLoading ? (
              <Loading />
            ) : (
              searchHistory.data?.length > 0 &&
              searchHistory.data.map((search) => {
                const profile = search.searchedProfile;
                return (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    onClick={() => {
                      props.toggleSearchbar();
                    }}
                  >
                    <button
                      className="ml-auto p-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteSearch.mutate(profile.id);
                      }}
                    >
                      <Icon
                        className="text-tertiary"
                        path={mdiClose}
                        size={0.9}
                      />
                    </button>
                  </ProfileCard>
                );
              })
            )}
          </>
        ) : (
          results.map((profile) => {
            if (profile.id !== activeProfile?.id) {
              return (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onClick={() => {
                    props.toggleSearchbar();
                    setSearchQuery('');
                    setResults([]);
                    createSearch.mutate(profile.id);
                  }}
                />
              );
            }
          })
        )}
      </div>
    </search>
  );
};

export default Searchbar;
