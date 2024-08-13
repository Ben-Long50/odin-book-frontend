import App from './App';
import ErrorPage from './components/ErrorPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<AuthLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route index path="signin" element={<SigninForm />} />
      </Route>
    </Route>,
  ),
);

export default router;
