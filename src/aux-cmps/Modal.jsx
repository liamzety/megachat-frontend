import React from "react";
import { useState } from "react";
import { Text } from "./Text";
import { ScreenModal } from "./ScreenModal";
export const Modal = ({ isOpen, title, children }) => {
  return isOpen ? (
    <>
      <div className="modal flex column">
        <div className="header">
          <Text type="h2">{title}</Text>
        </div>

        {children}
      </div>

      <ScreenModal />
    </>
  ) : (
    <></>
  );
};
