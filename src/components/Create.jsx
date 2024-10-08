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
import { useRef, useState } from 'react';

const Create = (props) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageAr, setImageAr] = useState('square');
  const [imageFit, setImageFit] = useState('contain');
  const [captionInput, setCaptionInput] = useState('');
  const dialogRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      setFile(selectedFile); // Update the state with the selected file

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  return (
    <>
      <dialog
        open={props.createOpen}
        className="fade-in-bottom bg-secondary-2 z-30 w-full max-w-4xl self-center rounded-xl"
        ref={dialogRef}
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
            <button className="fade-in-right text-accent font-semibold hover:underline">
              Post
            </button>
          </div>
        )}
        <hr className="bg-secondary" />
        <form className="box-border flex h-full flex-col justify-center">
          {!imagePreview ? (
            <label className="flex aspect-square size-full cursor-pointer flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                <Icon className="text-tertiary" path={mdiImagePlus} size={5} />
                <p className="text-tertiary mb-2 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-tertiary text-xs">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex flex-col justify-between gap-4">
              <div className="flex aspect-square max-w-4xl items-center justify-center">
                <img
                  className={`fade-in-bottom ${imageAr === 'portrait' && 'h-full'} ${imageAr === 'landscape' && 'w-full'} ${'aspect-' + imageAr} bg-black ${'object-' + imageFit}`}
                  src={imagePreview}
                  alt="Preview"
                />
              </div>
              <div className="flex items-center justify-center gap-8">
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
              </div>
              <div className="mx-4 mb-4 flex flex-col items-start gap-4">
                <h3 className="fade-in-left text-primary text-xl font-semibold">
                  Caption
                </h3>
                <div className="fade-in-right bg-secondary flex h-24 w-full gap-2 rounded-2xl border p-4">
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
            </div>
          )}
        </form>
      </dialog>
      {props.createOpen && (
        <>
          <div className="fixed inset-0 z-20 bg-black opacity-75"></div>

          <button
            className="text-primary absolute right-0 top-0 z-30 p-2"
            onClick={() => props.setCreateOpen(false)}
          >
            <Icon path={mdiClose} size={1.3} />
          </button>
        </>
      )}
    </>
  );
};

export default Create;
