import { useContext, useRef, useState } from 'react';
import ProfilePic from './ProfilePic';
import Button from './Button';
import Icon from '@mdi/react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { mdiImageEditOutline, mdiTrashCanOutline } from '@mdi/js';
import useDeleteProfileMutation from '../hooks/useDeleteProfileMutation';
import useCreateProfileMutation from '../hooks/useCreateProfileMutation';
import { LayoutContext } from './LayoutContext';

const ProfileForm = (props) => {
  const { layoutSize } = useContext(LayoutContext);
  const { apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const createProfile = useCreateProfileMutation(apiUrl);

  const deleteProfile = useDeleteProfileMutation(props.profile?.id, apiUrl);

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    props.profile?.profilePicUrl || null,
  );
  const [usernameInput, setUsernameInput] = useState(
    props.profile?.username || '',
  );
  const [petNameInput, setPetNameInput] = useState(
    props.profile?.petName || '',
  );
  const [bioInput, setBioInput] = useState(props.profile?.bio || '');
  const [speciesInput, setSpeciesInput] = useState(
    props.profile?.species || '',
  );
  const [breedInput, setBreedInput] = useState(props.profile?.breed || '');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setFile(selectedFile); // Update the state with the selected file

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('id', props.profile?.id || null);
    if (file) {
      formData.append('image', file);
    }
    formData.append('username', usernameInput);
    formData.append('petName', petNameInput);
    formData.append('bio', bioInput);
    formData.append('species', speciesInput);
    formData.append('breed', breedInput);

    await createProfile.mutateAsync(formData);
  };

  const handleDelete = () => {
    deleteProfile.mutate();
  };

  const inputRef = useRef(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div className="fade-in-right bg-secondary-2 flex items-center justify-between rounded-2xl p-4">
        <div className="flex items-center justify-start gap-4 md:gap-8">
          {!imagePreview ? (
            <ProfilePic className="size-20 md:size-32" />
          ) : (
            <ProfilePic image={imagePreview} className="size-20 md:size-32" />
          )}
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="font-semibold md:text-2xl">{usernameInput}</p>
            <p className="md:text-xl">{petNameInput}</p>
          </div>
        </div>
        <label>
          {layoutSize === 'xsmall' || layoutSize === 'small' ? (
            <Button
              className="ml-4 p-1 text-sm font-semibold"
              type="button"
              onClick={handleButtonClick}
            >
              <Icon path={mdiImageEditOutline} size={1.25} />
            </Button>
          ) : (
            <Button
              className="ml-4 px-3 py-2 text-sm font-semibold"
              type="button"
              onClick={handleButtonClick}
            >
              Change photo
            </Button>
          )}
          <input
            ref={inputRef}
            id="file"
            type="file"
            name="image"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full items-end justify-between gap-4">
          <h3 className="fade-in-left text-primary text-xl font-semibold">
            Username <span className="text-tertiary text-sm">(required)</span>
          </h3>
        </div>
        <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
          <input
            className="h-full w-full self-center overflow-auto bg-transparent outline-none"
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Username"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex w-full items-end justify-between gap-4">
          <h3 className="fade-in-left text-primary text-xl font-semibold">
            Pet name <span className="text-tertiary text-sm">(required)</span>
          </h3>
        </div>
        <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
          <input
            className="h-full w-full self-center overflow-auto bg-transparent outline-none"
            type="text"
            value={petNameInput}
            onChange={(e) => setPetNameInput(e.target.value)}
            placeholder="Pet name"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h3 className="fade-in-left text-primary text-xl font-semibold">Bio</h3>
        <div className="fade-in-right bg-secondary flex h-24 w-full gap-2 rounded-2xl border p-4">
          <textarea
            className="h-full w-full resize-none self-center overflow-auto bg-transparent outline-none"
            type="text"
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
            placeholder="Bio"
          />
          <p className="text-tertiary self-end text-nowrap text-sm">
            {bioInput?.length} / 150
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h3 className="fade-in-left text-primary text-xl font-semibold">
          Species
        </h3>
        <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
          <input
            className="h-full w-full self-center overflow-auto bg-transparent outline-none"
            type="text"
            value={speciesInput}
            onChange={(e) => setSpeciesInput(e.target.value)}
            placeholder="Species"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h3 className="fade-in-left text-primary text-xl font-semibold">
          Breed
        </h3>
        <div className="fade-in-right bg-secondary flex w-full gap-2 rounded-2xl border p-4">
          <input
            className="h-full w-full self-center overflow-auto bg-transparent outline-none"
            type="text"
            value={breedInput}
            onChange={(e) => setBreedInput(e.target.value)}
            placeholder="Breed"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {props.formType === 'edit' && (
            <button
              className="text-secondary fade-in-left timing bg-secondary rounded-lg border p-2 hover:bg-red-600 dark:hover:bg-red-500"
              onClick={props.deleteMode ? handleDelete : props.toggleDeleteMode}
            >
              <Icon path={mdiTrashCanOutline} size={1.25} />
            </button>
          )}
          {props.deleteMode && (
            <button
              className="fade-in-right text-secondary hover:underline"
              onClick={props.toggleDeleteMode}
            >
              Cancel
            </button>
          )}
        </div>
        <Button
          className="fade-in-left w-1/2 self-end py-2"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {props.submitText}
        </Button>
      </div>
      {props.deleteMode && (
        <p className="fade-in-left text-error">
          Press the delete button one more time to confirm deletion of this
          profile
        </p>
      )}
    </>
  );
};

export default ProfileForm;
