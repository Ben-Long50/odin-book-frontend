const Button = (props) => {
  return (
    <button
      aria-label={props.ariaLabel}
      className={`${props.className} timing accent-primary shadow-medium rounded-lg text-gray-900`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
