import React from "react";
import { Button } from "../aux-cmps/Button";
import { useState } from "react";

export const CreateChatModal = ({ toggleModal, onCreateChat }) => {
  const [chatDetails, setChatDetails] = useState({
    name: "",
  });
  return (
    <div className="create-chat-modal">
      <input
        type="text"
        value={chatDetails.name}
        onChange={({ target: { value } }) =>
          setChatDetails({ ...chatDetails, name: value })
        }
      />
      <div className="create-chat-modal-footer flex">
        <Button
          className="create-chat-modal-footer-cta btn-cta grow-3"
          onClick={() => onCreateChat(chatDetails)}
        >
          Confirm
        </Button>

        <Button className="grow-1" onClick={toggleModal}>
          Close
        </Button>
      </div>
    </div>
  );
};
