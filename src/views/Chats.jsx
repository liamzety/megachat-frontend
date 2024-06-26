import React from "react";
import { useEffect } from "react";
import { createChat, loadChats } from "../store/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Text } from "../aux-cmps/Text";
import { ChatPreview } from "../cmps/ChatPreview";
import { Chat } from "./Chat";
import { CreateChat } from "../cmps/CreateChat";
import { Button } from "../aux-cmps/Button";
import { useState } from "react";
import { isMobile } from "react-device-detect";

export function Chats() {
  const [chatSearch, setChatSearch] = useState("");
  const [isChatsToggled, setIsChatsToggled] = useState(isMobile ? false : true);
  const { loggedUser } = useSelector((state) => state.userReducer);
  const { chats } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadChats());
  }, []);
  const handleChatClick = (chatId) => {
    if (!loggedUser) {
      alert("You must be logged in to view this page");
      return;
    }

    navigate(`/chat/${chatId}`);
  };

  const handleChatSearch = (val) => {
    setChatSearch(val);
  };

  const onToggleChats = () => {
    setIsChatsToggled(!isChatsToggled);
  };

  return (
    <section className="chats">
      <div className="chats-container flex">
        <div
          className={`chats-list-container
            ${!isChatsToggled ? "chats-list-container-hide" : ""}
            flex column`}
        >
          {!!chats.length ? (
            <>
              <div className="chats-search-container">
                <input
                  className="chats-search"
                  type="text"
                  name="searchbar"
                  placeholder="Search chat"
                  value={chatSearch}
                  onChange={(e) => handleChatSearch(e.target.value)}
                />
              </div>
              <div className="chats-list">
                {chats
                  .filter((chat) => chat.name.includes(chatSearch))
                  .map((chat) => (
                    <ChatPreview
                      onChatClick={() => handleChatClick(chat._id)}
                      chat={chat}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="p-x-14 p-y-14">
              <CreateChat>
                <Button>Create Chat</Button>
              </CreateChat>
            </div>
          )}
        </div>
        <>
          <Chat onToggleChats={onToggleChats} />
        </>
      </div>
    </section>
  );
}
