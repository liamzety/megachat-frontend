import React from "react";
import { Text } from "../aux-cmps/Text";

export const RoomPreview = ({ name, onRoomClick }) => {
  return (
    <div onClick={() => onRoomClick()} className="room-box cursor-pointer">
      <Text type="text">{name}</Text>
    </div>
  );
};
