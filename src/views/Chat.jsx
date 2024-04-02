import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../aux-cmps/Loader";
import { Text } from "../aux-cmps/Text";
import { chatService } from "../services/chatSevice";
import socketService from "../services/socketService";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { Button } from "../aux-cmps/Button";
import { createMsg } from "../store/actions/chatActions";
import { IoIosChatboxes } from "react-icons/io";

const _getFormattedTime = (timestamp) => {
  let h = new Date(timestamp).getHours();
  let m = new Date(timestamp).getMinutes();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  return h + ":" + m;
};

export const Chat = ({ onToggleChats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.userReducer);
  let { chatId } = useParams();

  const [chat, setChat] = useState(null);
  const [msg, setMsg] = useState({
    timeSent: null,
    value: "",
    author: "",
  });
  const [userTyping, setUserTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const elChatInput = useRef(null);

  const loadChat = async () => {
    console.log("here");
    const chat = await chatService.queryOne(chatId);
    setChat(chat);
  };

  useEffect(() => {
    if (!loggedUser || !chatId) {
      resetChat();
      return;
    }

    loadChat();
    socketService.setup();
    socketService.emit("chat connectChat", chatId);
    socketService.on("chat addMsg", handleSentMsg);
    socketService.on("chat showTyping", showTyping);

    return () => {
      socketService.terminate();
    };
  }, [chatId, loggedUser]);

  const resetChat = () => {
    setChat(null);
  };

  const handleSendMsg = () => {
    if (!chatInput) return;

    socketService.emit("chat addMsg", msg);
    setMsg({
      value: "",
      author: "",
      timeSent: "",
      chatId,
    });
    setChatInput("");
    elChatInput.current.focus();
  };
  const handleTyping = (ev) => {
    setChatInput(ev.target.value);
    socketService.emit("chat showTyping", loggedUser.username);
    setMsg({
      value: ev.target.value,
      author: loggedUser.username,
      timeSent: Date.now(),
      chatId,
    });
  };
  // Setting the UserTyping and debouncing before clearing it
  const showTyping = () => {
    setUserTyping(true);
    handler();
  };
  function handleSentMsg() {
    // slimey hack because of no parameters specified in .on method
    const _msg = arguments[0];
    setChat((prevState) => {
      return { ...prevState, msgs: [...prevState.msgs, _msg] };
    });

    dispatch(createMsg(_msg));
  }
  const handler = useCallback(
    debounce(() => {
      setUserTyping("");
    }, 800),
    []
  );

  return (
    <div className="chat flex">
      <div className="chat-container flex column">
        {chat ? (
          <>
            <div className="chat-header">
              <div
                onClick={() => {
                  onToggleChats();
                }}
                className="chat-header-chat-expand"
              >
                <IoIosChatboxes />
              </div>

              <Text type="h2" className="chat-header-title">
                {chat.name}
              </Text>
            </div>
            <div className="chat-msgs-list">
              {chat.msgs.map((msg) => (
                <div className="chat-msg-preview">
                  <div className="chat-msg-preview-value">
                    {msg.author} : {"    "} {msg.value}
                  </div>
                  <div className="chat-msg-preview-timestamp">
                    {_getFormattedTime(msg.timeSent)}
                  </div>
                </div>
              ))}
            </div>

            <form
              className="chat-footer"
              onSubmit={(ev) => {
                ev.preventDefault();
                handleSendMsg();
              }}
            >
              <input
                autofocus
                ref={elChatInput}
                value={chatInput}
                onChange={(e) => handleTyping(e)}
                type="text"
              />
              <Button className="chat-footer-sendbtn" type="submit">
                {" "}
                {">"}{" "}
              </Button>
            </form>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
