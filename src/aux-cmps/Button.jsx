import React from "react";

export const Button = ({ children, className, onClick }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} role="button">
      {children}
    </button>
  );
};
