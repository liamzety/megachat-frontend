import React from "react";
import { useState } from "react";

export const Modal = ({ isOpen, title,children }) => {

  return isOpen ? (
    <div className="modal flex column">
      <div className="header">{title}</div>
        {children}
    </div>
  ) : (
    <></>
  );
};
