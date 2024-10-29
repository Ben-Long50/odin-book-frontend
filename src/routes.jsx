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
import ForeignProfile from './components/ForeignProfile';
import Bookmarks from './components/Bookmarks';
import ManageProfiles from './components/ManageProfiles';
import ProfileEdit from './components/ProfileEdit';
import ProfileCreate from './components/ProfileCreate';
import AccountEdit from './components/AccountEdit';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signup" element={<SignupForm />} />
        <Route index path="signin" element={<SigninForm />} />
      </Route>
      <Route element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route path="home" element={<Feed />}></Route>
        <Route path="explore" element={<Explore />}></Route>
        <Route path="profile" element={<PersonalProfile />}></Route>
        <Route path="manage" element={<ManageProfiles />}></Route>
        <Route path="profile/:username" element={<ForeignProfile />}></Route>
        <Route path="profile/bookmarks" element={<Bookmarks />}></Route>
        <Route path="profile/edit" element={<ProfileEdit />}></Route>
        <Route path="account/edit" element={<AccountEdit />}></Route>
        <Route path="manage/create" element={<ProfileCreate />}></Route>
      </Route>
      <Route path="error" element={<ErrorPage />} />
    </Route>,
  ),
);

export default router;
