import { mdiClose, mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import ProfilePic from './ProfilePic';
import { AuthContext } from './AuthContext';
import getSearchMatch from '../services/getSearchMatch';
import { GlobalContext } from './GlobalContext';
import { Link } from 'react-router-dom';
import getSearchHistory from '../services/getSearchHistory';
import createSearchEntry from '../services/createSearchEntry';
import Loading from './Loading';
import deleteSearchEntry from '../services/deleteSearchEntry';
import deleteSearchHistory from '../services/deleteSearchHistory';

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
      console.log(searches);

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
      className={`${props.className} bg-secondary flex h-dvh w-full flex-col shadow-md-right md:min-w-96 dark:shadow-gray-950`}
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
              searchHistory.data.length > 0 &&
              searchHistory.data.map((search) => {
                const profile = search.searchedProfile;
                return (
                  <Link
                    to={`/profile/${profile.username}`}
                    className="timing hover:bg-secondary-2 flex w-full cursor-pointer items-center gap-4 rounded-lg p-2"
                    state={profile}
                    key={profile.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.toggleSearchbar();
                    }}
                  >
                    <ProfilePic
                      image={profile.profilePicUrl}
                      className="size-12 shrink-0"
                    />
                    <p className="text-primary text-lg">{profile.username}</p>
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
                  </Link>
                );
              })
            )}
          </>
        ) : (
          results.map((profile) => {
            if (profile.id !== activeProfile.id) {
              return (
                <Link
                  to={`/profile/${profile.username}`}
                  key={profile.id}
                  className="timing hover:bg-secondary-2 flex cursor-pointer items-center gap-6 rounded-lg p-2"
                  state={profile}
                  onClick={() => {
                    props.toggleSearchbar();
                    setSearchQuery('');
                    setResults([]);
                    createSearch.mutate(profile.id);
                  }}
                >
                  <ProfilePic
                    image={profile.profilePicUrl}
                    className="size-12 shrink-0"
                  />
                  <div>
                    <p className="text-primary text-lg">{profile.username}</p>
                    <p className="text-tertiary">{profile.petName}</p>
                  </div>
                </Link>
              );
            }
          })
        )}
      </div>
    </search>
  );
};

export default Searchbar;
