import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { AuthContext } from './AuthContext';
import AuthOptions from './AuthOptions';
import AuthFormLayout from '../layouts/AuthFormLayout';
import useSigninMutation from '../hooks/useSigninMutation';
import useGuestSigninMutation from '../hooks/useGuestSigninMutation';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  const signinMutation = useSigninMutation(apiUrl, setErrors);
  const guestSigninMutation = useGuestSigninMutation(apiUrl, setErrors);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorMessage = params.get('error');
    const statusCode = params.get('status');
    if (errorMessage) {
      setErrors([errorMessage]);
      console.log(`Error Code: ${statusCode}`);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    signinMutation.mutate(formData);
  };

  const handleGuest = () => {
    setErrors([]);
    guestSigninMutation.mutate();
  };

  return (
    <AuthFormLayout label="Sign in" errors={errors} handleSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <InputField
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          minLength={6}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        className="hover:shadow-hover p-2 text-lg md:text-xl"
      >
        Sign in
      </Button>
      <AuthOptions />
      <Button
        className="hover:shadow-hover w-full p-2 text-lg"
        onClick={(e) => {
          e.preventDefault();
          handleGuest();
        }}
      >
        Sign in as human (guest)
      </Button>
      <p className="text-tertiary w-full text-center">
        Don't have an account?
        <Link to="/signup">
          <span className="pl-2 hover:underline">Sign up</span>
        </Link>
      </p>
    </AuthFormLayout>
  );
};

export default SigninForm;
