import Icon from '@mdi/react';
import { mdiGoogle, mdiFacebook } from '@mdi/js';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const AuthOptions = () => {
  const { apiUrl } = useContext(AuthContext);

  const facebookSignin = () => {
    window.location.href = `${apiUrl}/auth/facebook`;
  };

  const googleSignin = async () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className="flex w-full flex-col gap-8 md:gap-10">
      <div className="text-tertiary -my-2 flex items-center">
        <hr className="grow border-gray-400" />
        <p className="mx-4 text-gray-400">or</p>
        <hr className="grow border-gray-400" />
      </div>
      <div className="flex items-center gap-8">
        <button
          className="text-secondary hover:shadow-hover bg-secondary timing shadow-medium flex w-full items-center justify-center rounded-lg p-2 text-lg ring-emerald-300 hover:ring-2"
          onClick={(e) => {
            e.preventDefault();
            googleSignin();
          }}
        >
          <Icon className="text-secondary mr-2" path={mdiGoogle} size={1.5} />
          Google
        </button>
        <button
          className="text-secondary hover:shadow-hover bg-secondary timing shadow-medium flex w-full items-center justify-center rounded-lg p-2 text-lg ring-emerald-300 hover:ring-2"
          onClick={(e) => {
            e.preventDefault();
            facebookSignin();
          }}
        >
          <Icon className="text-secondary mr-2" path={mdiFacebook} size={1.5} />
          Facebook
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
