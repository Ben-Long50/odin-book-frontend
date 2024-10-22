import {
  mdiArrowLeft,
  mdiClose,
  mdiCropLandscape,
  mdiCropPortrait,
  mdiCropSquare,
  mdiImage,
  mdiImageOutline,
  mdiImagePlus,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import createPost from '../services/createPost';
import { AuthContext } from './AuthContext';
import { GlobalContext } from './GlobalContext';
import RootPortal from '../layouts/RootPortal';
import Button from './Button';

const Create = (props) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageAr, setImageAr] = useState('square');
  const [imageFit, setImageFit] = useState('contain');
  const [captionInput, setCaptionInput] = useState('');
  const { apiUrl } = useContext(AuthContext);
  const { activeProfile } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  const newPost = useMutation({
    mutationFn: (formData) => {
      return createPost(formData, activeProfile.id, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setFile(selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append('image', file);
    }
    formData.append('caption', captionInput);
    newPost.mutate(formData);
    setFile(null);
    setImagePreview(null);
    setCaptionInput('');
    props.setCreateOpen(false);
  };

  if (!props.createOpen) return null;

  return (
    <RootPortal create={true} onClick={() => props.setCreateOpen(false)}>
      <div
        className="fade-in-bottom bg-secondary-2 z-30 mx-auto h-auto max-h-dvh w-full max-w-4xl self-center md:max-h-dvh-95 md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!imagePreview ? (
          <h2 className="text-primary py-2 text-center text-lg font-semibold">
            Create new post
          </h2>
        ) : (
          <div className="flex items-center justify-between px-2">
            <button
              className="fade-in-left"
              onClick={() => setImagePreview(null)}
            >
              <Icon className="text-primary" path={mdiArrowLeft} size={1.25} />
            </button>
            <h2 className="text-primary py-2 text-center text-lg font-semibold">
              Post details
            </h2>
            <button
              className="fade-in-right text-primary"
              onClick={() => props.setCreateOpen(false)}
            >
              <Icon path={mdiClose} size={1.3} />
            </button>
          </div>
        )}
        <hr className="bg-secondary" />
        {!imagePreview ? (
          <label className="flex aspect-square size-full cursor-pointer flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
              <Icon className="text-tertiary" path={mdiImagePlus} size={5} />
              <p className="text-tertiary mb-2 text-sm">
                <span className="text-xl font-semibold">
                  Click anywhere to upload
                </span>
              </p>
              <p className="text-tertiary text-lg">SVG, PNG, JPG or GIF</p>
            </div>
            <input
              id="file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="flex h-full flex-col justify-between">
            <div className="flex aspect-square max-w-4xl items-center justify-center overflow-hidden bg-black">
              <img
                className={`fade-in-bottom ${imageAr === 'portrait' && 'h-full'} ${imageAr === 'landscape' && 'w-full'} ${'object-' + imageFit}`}
                src={imagePreview}
                alt="Preview"
              />
            </div>
            {/* <div className="mt-4 flex items-center justify-center gap-8">
                <div className="fade-in-left flex flex-col items-center gap-2">
                  <h3 className="text-primary">Aspect ratio</h3>
                  <div className="flex gap-2">
                    <button
                      className={`${imageAr === 'square' ? 'text-secondary bg-gray-700' : 'text-tertiary'} timing flex flex-col items-center justify-center rounded-md p-2 text-sm`}
                      onClick={(e) => {
                        e.preventDefault();
                        setImageAr('square');
                      }}
                    >
                      <Icon
                        className="text-inherit"
                        path={mdiCropSquare}
                        size={1.75}
                      />
                      <p className="text-inherit">Square</p>
                    </button>
                    <button
                      className={`${imageAr === 'portrait' ? 'text-secondary bg-gray-700' : 'text-tertiary'} timing flex flex-col items-center justify-center rounded-md p-2 text-sm`}
                      onClick={(e) => {
                        e.preventDefault();
                        setImageAr('portrait');
                      }}
                    >
                      <Icon
                        className="text-inherit"
                        path={mdiCropPortrait}
                        size={1.75}
                      />
                      <p className="text-inherit">Portrait</p>
                    </button>
                    <button
                      className={`${imageAr === 'landscape' ? 'text-secondary bg-gray-700' : 'text-tertiary'} timing flex flex-col items-center justify-center rounded-md p-2 text-sm`}
                      onClick={(e) => {
                        e.preventDefault();
                        setImageAr('landscape');
                      }}
                    >
                      <Icon
                        className="text-inherit"
                        path={mdiCropLandscape}
                        size={1.75}
                      />
                      <p className="text-inherit">Landscape</p>
                    </button>
                  </div>
                </div>
                <div className="fade-in-right flex flex-col items-center gap-2">
                  <h3 className="text-primary">Image fit</h3>
                  <div className="flex gap-2">
                    <button
                      className={`${imageFit === 'contain' ? 'text-secondary bg-gray-700' : 'text-tertiary'} timing flex flex-col items-center justify-center rounded-md p-2 text-sm`}
                      onClick={(e) => {
                        e.preventDefault();
                        setImageFit('contain');
                      }}
                    >
                      <Icon
                        className="text-inherit"
                        path={mdiImageOutline}
                        size={1.75}
                      />
                      <p className="text-inherit">Contain</p>
                    </button>
                    <button
                      className={`${imageFit === 'cover' ? 'text-secondary bg-gray-700' : 'text-tertiary'} timing flex flex-col items-center justify-center rounded-md p-2 text-sm`}
                      onClick={(e) => {
                        e.preventDefault();
                        setImageFit('cover');
                      }}
                    >
                      <Icon
                        className="text-inherit"
                        path={mdiImage}
                        size={1.75}
                      />
                      <p className="text-inherit">Cover</p>
                    </button>
                  </div>
                </div>
              </div> */}
            <div className="m-4 flex flex-col items-start gap-4 md:m-6">
              <h3 className="fade-in-left text-primary text-xl font-semibold">
                Caption
              </h3>
              <div className="fade-in-right bg-secondary flex h-24 w-full gap-2 rounded-xl border p-4">
                <textarea
                  className="text-primary h-full w-full resize-none self-center overflow-auto bg-transparent outline-none"
                  type="text"
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="Caption..."
                />
                <p className="text-tertiary self-end text-nowrap text-sm">
                  {captionInput.length} / 150
                </p>
              </div>
            </div>
            <Button
              className="mb-4 mr-4 w-1/2 self-end p-2 md:mb-6 md:mr-6"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        )}
      </div>
    </RootPortal>
  );
};

export default Create;
