import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import Logo from './Logo';
import { AuthContext } from './AuthContext';
import AuthOptions from './AuthOptions';
import PawIcon from '../assets/PawIcon';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const { signin, apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const response = await fetch(`${apiUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        navigate('/home');
      } else {
        const errorArray = result.map((error) => {
          return error.msg;
        });
        setErrors(errorArray);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className="logo-load flex items-center justify-center gap-4 md:gap-8">
        <Logo textSize="text-5xl md:text-8xl " />
        <PawIcon className="size-16 md:size-32" />
      </div>
      <div className="form-load bg-secondary shadow-medium flex w-full max-w-lg flex-col items-center gap-10 px-12 py-8 md:rounded-xl">
        <form
          className="flex w-full flex-col gap-10"
          method="post"
          onSubmit={handleSubmit}
        >
          <h1 className="text-primary text-2xl font-medium md:text-4xl">
            Sign In
          </h1>
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
          <Button type="submit" className="hover:shadow-hover p-2 md:text-xl">
            Sign in
          </Button>
        </form>
        <AuthOptions />
        <Button className="hover:shadow-hover w-full p-2 text-xl">
          Sign in as human (guest)
        </Button>
        <p className="text-tertiary">
          Don't have an account?
          <Link to="/signup">
            <span className="pl-2 hover:underline">Sign up</span>
          </Link>
        </p>
        {errors.length > 0 && (
          <div className="flex flex-col gap-3 self-start">
            <span className="text-primary">Error signing in</span>
            {errors.map((error, index) => (
              <p key={index} className="text-error">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SigninForm;
