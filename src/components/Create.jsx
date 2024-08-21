import { mdiImagePlus } from '@mdi/js';
import Icon from '@mdi/react';

const Create = () => {
  return (
    <div className="text-primary layout-cols center grid p-4 md:p-6 lg:p-8">
      <form className="col-start-2 col-end-3 flex w-full max-w-xl flex-col gap-4 justify-self-center">
        <label className="bg-secondary-2 flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
          <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
            <Icon className="text-tertiary" path={mdiImagePlus} size={5} />
            <p className="text-tertiary mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-tertiary text-xs">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="file" type="file" className="hidden" />
        </label>
        <textarea
          className="bg-secondary-2 h-40 rounded-lg p-2"
          name="body"
          id="body"
          placeholder="Enter your caption..."
        ></textarea>
      </form>
    </div>
  );
};

export default Create;
