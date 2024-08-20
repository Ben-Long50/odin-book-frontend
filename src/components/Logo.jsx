import PawIcon from '../assets/PawIcon';

const Logo = (props) => {
  return (
    <div className={`${props.className} relative`}>
      <PawIcon
        className={`${props.iconSize} absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2`}
      />
      <h1 className={`${props.textSize} text-primary relative tracking-widest`}>
        Pawprint
      </h1>
    </div>
  );
};

export default Logo;
