import React from "react";
import { Button } from "../aux-cmps/Button";
import { useState } from "react";

export const CreateRoomModal = ({ toggleModal, onCreateRoom }) => {
  const [roomDetails, setRoomDetails] = useState({
    name: "",
  });
  return (
    <div className="create-room-modal">
      <input
        type="text"
        value={roomDetails.name}
        onChange={({ target: { value } }) =>
          setRoomDetails({ ...roomDetails, name: value })
        }
      />
      <div className="create-room-modal-footer flex column">
        <Button className="cta" onClick={() => onCreateRoom(roomDetails)}>
          Confirm
        </Button>
        <Button onClick={toggleModal}>Close</Button>
      </div>
    </div>
  );
};
