import PawIcon from '../assets/PawIcon';

const Logo = (props) => {
  return (
    <div className={`${props.className} flex items-center justify-start gap-4`}>
      <h1 className={`${props.textSize} text-primary tracking-widest`}>
        Pawprint
      </h1>
      <PawIcon className={`${props.iconSize}`} />
    </div>
  );
};

export default Logo;
