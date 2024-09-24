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
import PersonalProfile from './components/PersonalProfile';
import EditProfile from './components/EditProfile';
import ForeignProfile from './components/ForeignProfile';
import Bookmarks from './components/Bookmarks';

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
        <Route path="profile" element={<PersonalProfile />}></Route>
        <Route path="profile/:username" element={<ForeignProfile />}></Route>
        <Route path="profile/bookmarks" element={<Bookmarks />}></Route>
        <Route path="profile/edit" element={<EditProfile />}></Route>
      </Route>
    </Route>,
  ),
);

export default router;
