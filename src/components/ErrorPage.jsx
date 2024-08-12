import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <h1>This page doesn't exist!</h1>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default ErrorPage;
