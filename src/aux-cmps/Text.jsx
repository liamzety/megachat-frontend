import React from "react";

export const Text = ({ type, className, children }) => {
  return <div className={`text ${type} ${className}`}>{children}</div>;
};
