import { useContext, useState } from 'react';
import ProfilePic from './ProfilePic';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import createProfile from '../services/createProfile';
import { AuthContext } from './AuthContext';

const ProfileForm = (props) => {
  const { apiUrl } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: (formData) => {
      return createProfile(formData, apiUrl);
    },
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: props.profile?.id || 2,
      username: usernameInput,
      petName: petNameInput,
      bio: bioInput,
      species: speciesInput,
      breed: breedInput,
    };

    mutation.mutate(formData);
  };

  return (
    <>
      <div className="fade-in-right bg-secondary-2 flex items-center justify-between rounded-2xl p-4">
        <div className="flex items-center justify-start gap-4">
          <ProfilePic className="size-16" />
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="font-semibold">{usernameInput}</p>
            <p>{petNameInput}</p>
          </div>
        </div>
        <Button className="px-3 py-2 text-sm font-semibold">
          Change photo
        </Button>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h3 className="fade-in-left text-primary text-xl font-semibold">
          Username
        </h3>
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
        <h3 className="fade-in-left text-primary text-xl font-semibold">
          Pet name
        </h3>
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
            {bioInput.length} / 150
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
      <Button
        className="fade-in-left w-1/2 self-end py-2 font-semibold"
        onClick={(e) => handleSubmit(e)}
      >
        {props.submitText}
      </Button>
    </>
  );
};

export default ProfileForm;
