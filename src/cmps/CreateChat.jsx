import React from "react";
import { Modal } from "../aux-cmps/Modal";
import { CreateChatModal } from "./CreateChatModal";
import { useDispatch } from "react-redux";
import { createChat } from "../store/actions/chatActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreateChat = ({ children }) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleCreateChatModal = () => {
    setIsChatModalOpen(!isChatModalOpen);
  };
  const onCreateChat = (chatDetails) => {
    setIsChatModalOpen(false);

    dispatch(createChat(chatDetails));
    navigate("/chats", { replace: true });
  };
  return (
    <>
      <div onClick={toggleCreateChatModal} className="create-chat">
        {children}
      </div>

      <Modal isOpen={isChatModalOpen} title="Chat Details">
        <CreateChatModal
          onCreateChat={(chatDetails) => {
            onCreateChat(chatDetails);
          }}
          toggleModal={toggleCreateChatModal}
        />
      </Modal>
    </>
  );
};
