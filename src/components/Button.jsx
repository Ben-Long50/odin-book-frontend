const Button = (props) => {
  return (
    <button
      className={`${props.className} timing accent-primary shadow-color rounded text-gray-900`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
