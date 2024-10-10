import { mdiCloseCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import ProfilePic from './ProfilePic';
import { AuthContext } from './AuthContext';
import getSearchMatch from '../services/getSearchMatch';
import { GlobalContext } from './GlobalContext';
import { Link } from 'react-router-dom';

const Searchbar = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);

  const searchResults = useMutation({
    mutationFn: async () => {
      const result = await getSearchMatch(searchQuery, apiUrl);
      if (result) {
        setResults(result);
      } else {
        setResults([]);
      }
    },
  });

  return (
    <search
      className={`${props.className} bg-secondary flex h-dvh min-w-96 flex-col shadow-md-right dark:shadow-gray-950`}
      style={props.style}
    >
      <div className="bg-secondary flex flex-col items-start gap-10 border-b p-6">
        <h1 className="text-primary text-3xl font-semibold">Search</h1>
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
            onClick={() => {
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
          <div className="flex items-center justify-between p-2">
            <h3 className="text-primary text-xl font-semibold">Recent</h3>
            <p className="hover:text-primary cursor-pointer text-lg text-blue-500">
              Clear all
            </p>
          </div>
        ) : (
          results.map((profile) => {
            if (profile.id !== activeProfile.id) {
              return (
                <Link
                  to={`/profile/${profile.username}`}
                  key={profile.id}
                  className="timing hover:bg-secondary-2 flex cursor-pointer items-center gap-6 rounded-lg p-2"
                  state={profile}
                  onClick={props.toggleSearchbar}
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
