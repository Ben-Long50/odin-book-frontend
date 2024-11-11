import { forwardRef, useEffect, useState } from 'react';

const CloudinaryImage = forwardRef((props, ref) => {
  const [aspectRatio, setAspectRatio] = useState({ width: 1, height: 1 });

  const splitUrl = props.url.split('upload/');

  const responsiveUrl = splitUrl[0]
    .concat('upload/w_auto,c_scale/')
    .concat(splitUrl[1]);

  const infoUrl = splitUrl[0].concat('upload/fl_getinfo/').concat(splitUrl[1]);

  useEffect(() => {
    if (window.cloudinary) {
      const cl = window.cloudinary.Cloudinary.new({
        cloud_name: import.meta.env.VITE_CLOUD_NAME,
      });

      cl.responsive();
    }
  }, []);

  useEffect(() => {
    const getAspecRatio = async () => {
      try {
        const response = await fetch(`${infoUrl}`, {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch aspect ratio. Status: ${response.status}`,
          );
        }

        const data = await response.json();

        if (
          !data.input ||
          typeof data.input.width !== 'number' ||
          typeof data.input.height !== 'number'
        ) {
          throw new Error('Unexpected response format from Cloudinary');
        }

        const imageWidth = data.input.width;
        const imageHeight = data.input.height;

        if (imageHeight === 0) {
          throw new Error('Image height is 0, cannot compute aspect ratio');
        }

        setAspectRatio({
          width: imageWidth.toString(),
          height: imageHeight.toString(),
        });
      } catch (error) {
        console.error(`Error getting aspect ratio: ${error.message}`);
        setAspectRatio(1);
      }
    };

    getAspecRatio();
  }, [infoUrl]);

  return (
    <div
      className={`timing flex w-full justify-center object-cover transition-all`}
      style={{
        aspectRatio: aspectRatio.width / aspectRatio.height,
        transition: 'aspect-ratio 0.3s ease-out',
      }}
    >
      <img
        ref={ref}
        className={`${props.className} cld-responsive`}
        width={props.width}
        height={props.height}
        data-src={responsiveUrl}
        alt="Post picture"
        onClick={props.onClick}
      />
    </div>
  );
});

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
