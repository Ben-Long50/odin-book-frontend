import { forwardRef, useEffect, useState } from 'react';
import { useImage } from 'react-img-placeholder';

const CloudinaryImage = forwardRef((props, ref) => {
  const [dimensions, setDimensions] = useState({ width: null, height: null });
  const [responsiveUrl, setResponsiveUrl] = useState(() => {
    const properties = 'upload/w_auto,c_scale/';
    const splitUrl = props.url.split('upload/');
    return splitUrl[0].concat(properties).concat(splitUrl[1]);
  });
  const { isLoading } = useImage({ src: props.url });

  useEffect(() => {
    const img = new Image();
    img.src = props.url;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
    console.log(img.width, img.height);
  }, [props.url]);

  useEffect(() => {
    if (window.cloudinary) {
      const cl = window.cloudinary.Cloudinary.new({
        cloud_name: import.meta.env.VITE_CLOUD_NAME,
      });

      cl.responsive();
    }
  }, [dimensions]);

  if (isLoading) {
    return (
      <div
        className="bg-black opacity-5 dark:bg-white"
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio:
            dimensions.width && dimensions.height
              ? `${dimensions.width} / ${dimensions.height}`
              : '3/4',
        }}
      />
    );
  }

  return (
    <img
      ref={ref}
      className={`${props.className} cld-responsive`}
      data-src={responsiveUrl}
      alt="Post picture"
      loading="lazy"
      onClick={props.onClick}
    />
  );
});

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
