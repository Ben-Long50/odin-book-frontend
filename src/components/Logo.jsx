const Logo = (props) => {
  return (
    <div className={`${props.className} flex items-center justify-start gap-4`}>
      <h1 className={`${props.textSize} font-logo text-primary`}>Pawprint</h1>
    </div>
  );
};

export default Logo;
