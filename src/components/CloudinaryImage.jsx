import { forwardRef, useEffect, useState } from 'react';
import { useImage } from 'react-img-placeholder';

const CloudinaryImage = forwardRef((props, ref) => {
  const [responsiveUrl, setResponsiveUrl] = useState(() => {
    const properties = 'upload/w_auto,c_scale/';
    const splitUrl = props.url.split('upload/');
    return splitUrl[0].concat(properties).concat(splitUrl[1]);
  });
  const { isLoading } = useImage({ src: props.url });

  useEffect(() => {
    if (window.cloudinary) {
      const cl = window.cloudinary.Cloudinary.new({
        cloud_name: import.meta.env.VITE_CLOUD_NAME,
      });

      cl.responsive();
    }
  }, []);

  return (
    <img
      ref={ref}
      className={`${props.className} cld-responsive ${isLoading && 'bg-black opacity-5 dark:bg-white'}`}
      width={props.width}
      height={props.height}
      data-src={responsiveUrl}
      alt="Post picture"
      onClick={props.onClick}
    />
  );
});

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
