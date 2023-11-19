import React from "react";
import { Text } from "../aux-cmps/Text";
import { useParams } from "react-router-dom";

export const ChatPreview = ({ chat, onChatClick }) => {
  let { chatId } = useParams();
  return (
    <div
      onClick={() => onChatClick()}
      className={`chat-preview cursor-pointer ${
        chat._id === chatId ? "active" : ""
      }`}
    >
      <Text type="text">{chat.name}</Text>
    </div>
  );
};
