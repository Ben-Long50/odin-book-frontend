import { forwardRef, useEffect, useState } from 'react';

const CloudinaryImage = forwardRef((props, ref) => {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
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

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
    img.src = responsiveUrl;
  }, [responsiveUrl]);

  return (
    <img
      ref={ref}
      width={dimensions.width}
      height={dimensions.height}
      className={`${props.className} cld-responsive`}
      data-src={responsiveUrl}
      alt="Post picture"
      onClick={props.onClick}
    />
  );
});

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
