import { useState } from 'react';
import ProfilePic from './ProfilePic';
import Button from './Button';
import PerfectScrollbar from 'react-perfect-scrollbar';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    username: 'Kitty_da_TA',
    posts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    petName: 'Kitty',
    species: 'Cat',
    breed: 'Turkish Angora',
    bio: "I'm just a little Turkish Angora!",
  });
  const [usernameInput, setUsernameInput] = useState(profile.username);
  const [petNameInput, setPetNameInput] = useState(profile.petName);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [speciesInput, setSpeciesInput] = useState(profile.species);
  const [breedInput, setBreedInput] = useState(profile.breed);

  return (
    <PerfectScrollbar className="h-full overflow-y-auto">
      <div className="text-primary layout-cols grid py-4 md:p-6 lg:p-8">
        <div className="col-start-2 col-end-3 flex h-full w-full max-w-2xl flex-col gap-8 justify-self-center p-4">
          <h1 className="text-primary text-2xl font-semibold"> Edit Profile</h1>
          <div className="bg-secondary-2 flex items-center justify-between rounded-2xl p-4">
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
            <h3 className="text-primary text-xl font-semibold">Username</h3>
            <div className="bg-secondary flex w-full gap-2 rounded-2xl border p-4">
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
            <h3 className="text-primary text-xl font-semibold">Pet name</h3>
            <div className="bg-secondary flex w-full gap-2 rounded-2xl border p-4">
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
            <h3 className="text-primary text-xl font-semibold">Bio</h3>
            <div className="bg-secondary flex h-24 w-full gap-2 rounded-2xl border p-4">
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
            <h3 className="text-primary text-xl font-semibold">Species</h3>
            <div className="bg-secondary flex w-full gap-2 rounded-2xl border p-4">
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
            <h3 className="text-primary text-xl font-semibold">Breed</h3>
            <div className="bg-secondary flex w-full gap-2 rounded-2xl border p-4">
              <input
                className="h-full w-full self-center overflow-auto bg-transparent outline-none"
                type="text"
                value={breedInput}
                onChange={(e) => setBreedInput(e.target.value)}
                placeholder="Breed"
              />
            </div>
          </div>
          <Button className="w-1/2 self-end py-2 font-semibold" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default EditProfile;
