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
        <button className="hover:shadow-hover bg-secondary-2 timing shadow-color flex w-full items-center justify-center rounded p-1 ring-emerald-300 hover:ring-2">
          <Icon className="text-primary" path={mdiGoogle} size={1.5}></Icon>
        </button>
        <button className="hover:shadow-hover bg-secondary-2 timing shadow-color flex w-full items-center justify-center rounded p-1 ring-emerald-300 hover:ring-2">
          <Icon
            className="text-primary grow"
            path={mdiFacebook}
            size={1.5}
          ></Icon>
        </button>
      </div>
    </div>
  );
};

export default AuthOptions;
