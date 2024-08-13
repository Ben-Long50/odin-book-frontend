import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import { AuthContext } from './AuthContext';
import AuthOptions from './AuthOptions';

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
    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result);
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
    <div className="flex w-full flex-col gap-6">
      <form
        className="flex flex-col gap-12"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 className="text-primary text-4xl font-medium">Sign Up</h1>
        <div className="flex flex-col gap-8">
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
        <AuthOptions />
      </form>
      <p className="text-tertiary">
        Already have an account?
        <Link to="/signin">
          <span className="pl-2 hover:underline">Sign in</span>
        </Link>
      </p>
      {errors.length > 0 && (
        <div className="flex flex-col gap-3 pt-4">
          <span className="text-primary">Error signing up</span>
          {errors.map((error, index) => (
            <p key={index} className="text-error">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignupForm;
