import "./button.css";

const Button = ({ isActive, onClick, children, className }) => {
  return (
    <>
      <button
        className={`${className} ${isActive ? "button-active" : ""}`}
        onClick={onClick}
        tabIndex={1}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
