import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { AuthContext } from './AuthContext';
import AuthOptions from './AuthOptions';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const { signin, apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home/all');
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
    try {
      const response = await fetch(`${apiUrl}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        signin(result.user);
        navigate('/home/all');
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
        className="flex w-full flex-col gap-12"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1 className="text-primary text-4xl font-medium">Sign In</h1>
        <div className="flex flex-col gap-8">
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
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="hover:shadow-hover p-2 text-xl">
          Sign in
        </Button>
        <AuthOptions />
      </form>
      <p className="text-secondary">
        Dont have an account?
        <Link to="/signup">
          <span className="pl-2 hover:underline">Sign up</span>
        </Link>
      </p>
      {errors.length > 0 && (
        <div className="flex flex-col gap-3 pt-4">
          <span className="text-primary">Error signing in</span>
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

export default SigninForm;
