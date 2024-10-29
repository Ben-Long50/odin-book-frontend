import { mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { AuthContext } from './AuthContext';
import useAccountQuery from '../hooks/useAccountQuery';
import useEditAccountMutation from '../hooks/useEditAccountMutation';
import useDeleteAccountMutation from '../hooks/useDeleteAccountMutation';
import Loading from './Loading';

const AccountEdit = () => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [errors, setErrors] = useState([]);
  const { apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const account = useAccountQuery(apiUrl);

  const editAccount = useEditAccountMutation(apiUrl);

  const deleteAccount = useDeleteAccountMutation(apiUrl);

  const [emailInput, setEmailInput] = useState('');
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  useEffect(() => {
    if (account.data) {
      setEmailInput(account.data.email || '');
      setFirstNameInput(account.data.firstName || '');
      setLastNameInput(account.data.lastName || '');
    }
  }, [account.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('email', emailInput.length > 0 ? emailInput : undefined);
    formData.append(
      'firstName',
      firstNameInput.length > 0 ? firstNameInput : undefined,
    );
    formData.append(
      'lastName',
      lastNameInput.length > 0 ? lastNameInput : undefined,
    );
    formData.append(
      'password',
      passwordInput.length > 0 ? passwordInput : undefined,
    );
    formData.append(
      'confirmPassword',
      confirmPasswordInput.length > 0 ? confirmPasswordInput : undefined,
    );

    if (passwordInput !== confirmPasswordInput) {
      throw new Error('Password fields must match to edit account info');
    }

    const result = await editAccount.mutateAsync(formData);
    console.log(result);

    if (result.errors) {
      setErrors(result.errors);
    }
  };

  const handleDelete = () => {
    deleteAccount.mutate();
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  if (account.isLoading || account.isPending) {
    return <Loading />;
  }

  return (
    <div className="text-primary layout-cols grid py-4 md:p-6 lg:p-8">
      <div className="col-start-2 col-end-3 flex h-full w-full max-w-2xl flex-col gap-8 justify-self-center p-4">
        <h1 className="fade-in-left text-primary text-2xl font-semibold">
          Edit Account
        </h1>
        <div className="flex flex-col items-start gap-4">
          <h3 className="fade-in-left text-primary text-xl font-semibold">
            Email
          </h3>
          <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
            <input
              className="h-full w-full self-center overflow-auto bg-transparent outline-none"
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="fade-in-left text-primary text-xl font-semibold">
            First name
          </h3>
          <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
            <input
              className="h-full w-full self-center overflow-auto bg-transparent outline-none"
              type="text"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
              placeholder="First name"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="fade-in-left text-primary text-xl font-semibold">
            Last name
          </h3>
          <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
            <input
              className="h-full w-full self-center overflow-auto bg-transparent outline-none"
              type="text"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="fade-in-left text-primary text-xl font-semibold">
            New password
          </h3>
          <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
            <input
              className="h-full w-full self-center overflow-auto bg-transparent outline-none"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className="fade-in-left text-primary text-xl font-semibold">
            Confirm new password
          </h3>
          <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
            <input
              className="h-full w-full self-center overflow-auto bg-transparent outline-none"
              type="password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
        </div>
        {errors.length > 0 && (
          <div className="flex flex-col gap-3 self-start">
            <span className="text-primary">Error signing in</span>
            {errors.map((error, index) => (
              <p key={index} className="text-error">
                {error.msg}
              </p>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              className="text-secondary fade-in-left timing bg-secondary rounded-lg border p-2 hover:bg-red-600 dark:hover:bg-red-500"
              onClick={deleteMode ? handleDelete : toggleDeleteMode}
            >
              <Icon path={mdiTrashCanOutline} size={1.25} />
            </button>
            {deleteMode && (
              <button
                className="fade-in-right text-secondary hover:underline"
                onClick={toggleDeleteMode}
              >
                Cancel
              </button>
            )}
          </div>
          <Button
            className="fade-in-left w-1/2 self-end py-2 font-semibold"
            onClick={(e) => {
              handleSubmit(e);
              //   navigate('/manage');
            }}
          >
            Save account settings
          </Button>
        </div>
        {deleteMode && (
          <p className="fade-in-left text-error">
            Press the delete button one more time to confirm deletion of this
            account
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountEdit;
