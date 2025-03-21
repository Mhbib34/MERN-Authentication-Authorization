const Button = ({ text, type, className, onClick }) => {
  return (
    <button className={`${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
