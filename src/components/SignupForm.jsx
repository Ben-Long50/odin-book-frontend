import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import { AuthContext } from './AuthContext';
import AuthFormLayout from '../layouts/AuthFormLayout';
import useSignupMutation from '../hooks/useSignupMutation';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);
  const { apiUrl } = useContext(AuthContext);

  const signupMutation = useSignupMutation(apiUrl, setErrors);

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
    signupMutation.mutate(formData);
  };

  return (
    <AuthFormLayout label="Sign up" errors={errors} handleSubmit={handleSubmit}>
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
      <Button
        type="submit"
        className="hover:shadow-hover p-2 text-lg md:text-xl"
      >
        Sign up
      </Button>
      <p className="text-tertiary text-center">
        Already have an account?
        <Link to="/signin">
          <span className="pl-2 hover:underline">Sign in</span>
        </Link>
      </p>
    </AuthFormLayout>
  );
};

export default SignupForm;
