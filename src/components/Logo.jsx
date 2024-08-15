import PawIcon from '../assets/PawIcon';

const Logo = () => {
  return (
    <div className="logo-load relative">
      <PawIcon className="absolute left-1/3 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2" />
      <h1 className="text-primary relative text-8xl tracking-widest">
        Pawprint
      </h1>
    </div>
  );
};

export default Logo;
