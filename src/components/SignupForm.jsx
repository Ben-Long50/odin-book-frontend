import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import Logo from './Logo';
import { AuthContext } from './AuthContext';
import PawIcon from '../assets/PawIcon';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { apiUrl } = useContext(AuthContext);

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
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        navigate('/signin');
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
      <div className="logo-load flex items-center justify-center gap-8">
        <Logo textSize="text-8xl" />
        <PawIcon className="size-32" />
      </div>
      <div className="form-load bg-secondary shadow-color flex w-full max-w-lg flex-col items-center gap-10 rounded-xl px-12 py-8">
        <form
          className="flex w-full flex-col gap-10"
          method="post"
          onSubmit={handleSubmit}
        >
          <h1 className="text-primary text-4xl font-medium">Sign Up</h1>
          <div className="flex flex-col gap-6">
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              minLength={2}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              type="text"
              minLength={2}
              onChange={handleChange}
            />
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
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              minLength={6}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="hover:shadow-hover p-2 text-xl">
            Sign up
          </Button>
        </form>
        <p className="text-tertiary">
          Already have an account?
          <Link to="/signin">
            <span className="pl-2 hover:underline">Sign in</span>
          </Link>
        </p>
        {errors.length > 0 && (
          <div className="flex flex-col gap-3 self-start">
            <span className="text-primary">Error signing up</span>
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

export default SignupForm;
