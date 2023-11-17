import React from "react";
import { useState } from "react";
import { Text } from "./Text";
export const Modal = ({ isOpen, title, children }) => {
  return isOpen ? (
    <div className="modal flex column">
      <Text type="h2" className="header">
        {title}
      </Text>
      {children}
    </div>
  ) : (
    <></>
  );
};
