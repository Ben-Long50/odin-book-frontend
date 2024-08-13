import Icon from '@mdi/react';
import { mdiGoogle, mdiFacebook } from '@mdi/js';

const AuthOptions = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-tertiary -mt-4 flex items-center">
        <hr className="grow border-gray-400" />
        <p className="mx-4 text-gray-400">or</p>
        <hr className="grow border-gray-400" />
      </div>
      <div className="flex items-center gap-8">
        <button className="text-secondary hover:shadow-hover bg-secondary-2 timing shadow-color flex w-full items-center justify-center rounded p-1 text-lg ring-emerald-300 hover:ring-2">
          <Icon className="text-secondary mr-2" path={mdiGoogle} size={1.5} />
          Google
        </button>
        <button className="text-secondary hover:shadow-hover bg-secondary-2 timing shadow-color flex w-full items-center justify-center rounded p-1 text-lg ring-emerald-300 hover:ring-2">
          <Icon className="text-secondary mr-2" path={mdiFacebook} size={1.5} />
          Facebook
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
