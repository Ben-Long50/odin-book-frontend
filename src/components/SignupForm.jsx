import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import { AuthContext } from './AuthContext';
import AuthFormLayout from '../layouts/AuthFormLayout';

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
