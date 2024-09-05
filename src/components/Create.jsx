import { mdiClose, mdiImagePlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useRef } from 'react';

const Create = (props) => {
  const dialogRef = useRef(null);

  return (
    <>
      <dialog
        open={props.createOpen}
        className="bg-secondary-2 z-30 aspect-square w-full max-w-4xl self-center rounded-xl"
        ref={dialogRef}
      >
        <h2 className="text-primary py-2 text-center text-lg font-semibold">
          Create new post
        </h2>
        <hr className="bg-secondary" />
        <form className="box-border flex h-full flex-col justify-center">
          <label className="flex size-full cursor-pointer flex-col items-center justify-center">
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
            <input id="file" type="file" className="hidden" />
          </label>
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
