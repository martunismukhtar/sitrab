import React from "react";

const Button = (props) => {
  const {
    children = "...",
    className = "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded",
    onClick = () => {},
    type = "button",
    disabled = false
  } = props;
  return (
    <button
      className={` ${className} `}
      type={type}
      onClick={(e) => onClick(e)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
