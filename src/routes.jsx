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
import MainLayout from './layouts/MainLayout';
import Feed from './components/Feed';
import Explore from './components/Explore';
import Create from './components/Create';
import Profile from './components/Profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<AuthLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route index path="signin" element={<SigninForm />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="home" element={<Feed />}></Route>
        <Route path="explore" element={<Explore />}></Route>
        <Route path="create" element={<Create />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
    </Route>,
  ),
);

export default router;
