import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline } from '@mdi/js';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const message =
    location.state?.message ||
    'An unexpected error occurred. Try refreshing the page';

  return (
    <div
      className={`${theme} bg-secondary flex h-dvh w-full flex-col items-center justify-start gap-4 px-6 py-8 md:gap-8`}
    >
      <Icon className="text-accent" path={mdiAlertCircleOutline} size={5} />
      <h1 className="text-primary text-center text-2xl font-semibold md:text-3xl">
        Oops an error occured
      </h1>
      {message && <p className="text-error text-center text-xl">{message}</p>}
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <Button
          className="w-full px-3 py-2 text-lg md:text-xl"
          onClick={() => navigate(-1)}
        >
          Refresh page
        </Button>
        <Link className="w-full" to="/signin">
          <Button className="w-full p-2 text-lg md:text-xl">Sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
