import { useNavigate, useRouteError } from 'react-router-dom';
import Button from './Button';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline } from '@mdi/js';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const message = location.state?.message;
  const error = useRouteError();

  return (
    <div
      className={`${theme} bg-secondary flex h-dvh w-full flex-col items-center justify-start gap-4 px-6 py-8 md:gap-8`}
    >
      <Icon
        className="fade-in-bottom bg-secondary text-accent"
        path={mdiAlertCircleOutline}
        size={5}
      />
      <h1 className="fade-in-bottom bg-secondary text-primary text-center text-2xl font-semibold md:text-3xl">
        Oops an error occured
      </h1>
      <p className="fade-in-bottom bg-secondary text-error text-center text-xl">
        {error.message}
      </p>
      <div className="fade-in-bottom bg-secondary grid grid-cols-2 gap-4 md:gap-8">
        <Button
          className="w-full px-3 py-2 text-lg md:text-xl"
          onClick={() => navigate(-1)}
        >
          Refresh page
        </Button>
        <Button
          className="w-full p-2 text-lg md:text-xl"
          onClick={() => navigate('/signin')}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
