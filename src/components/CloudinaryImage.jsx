import { useEffect, useState } from 'react';

const CloudinaryImage = (props) => {
  const [responsiveUrl, setResponsiveUrl] = useState(() => {
    const properties = 'upload/w_auto,c_scale/';
    const splitUrl = props.url.split('upload/');
    return splitUrl[0].concat(properties).concat(splitUrl[1]);
  });

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
      className={`${props.className} cld-responsive`}
      data-src={responsiveUrl}
      alt="Responsive image"
      onClick={props.onClick}
    />
  );
};

export default CloudinaryImage;
