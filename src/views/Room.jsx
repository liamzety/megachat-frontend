import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../aux-cmps/Loader";
import { Text } from "../aux-cmps/Text";
import { roomService } from "../services/roomSevice";
import socketService from "../services/socketService";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

const _getFormattedTime = (timestamp) => {
  let h = new Date(timestamp).getHours();
  let m = new Date(timestamp).getMinutes();
  console.log("h", h);
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;

  return h + ":" + m;
};

export const Room = (props) => {
  const navigate = useNavigate();

  const { loggedUser } = useSelector((state) => state.userReducer);
  let { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState({
    timeSent: null,
    value: "",
    author: "",
  });
  const [userTyping, setUserTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const elChatInput = useRef(null);

  const loadRoom = async () => {
    const room = await roomService.queryOne(roomId);
    setRoom(room);
  };

  useEffect(() => {
    if (!loggedUser) {
      alert("You must be logged in to view this page");
      navigate(`/rooms`);
    }

    loadRoom();
    socketService.setup();
    socketService.emit("chat connectRoom", roomId);
    socketService.on("chat addMsg", handleSentMsg);
    socketService.on("chat showTyping", showTyping);

    return () => {
      socketService.terminate();
    };
  }, []);

  const handleSendMsg = () => {
    socketService.emit("chat addMsg", msg);

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
    });
  };
  // Setting the UserTyping and debouncing before clearing it
  const showTyping = () => {
    console.log("typ");
    setUserTyping(true);
    handler();
  };
  function handleSentMsg() {
    // slimey hack because of no parameters specified in .on method
    const _msg = arguments[0];
    console.log("msg", _msg);
    setMsgs((prevState) => {
      return [...prevState, _msg];
    });
  }
  const handler = useCallback(
    debounce(() => {
      setUserTyping("");
    }, 800),
    []
  );

  return room ? (
    <div className="room">
      <div className="room-header">
        <Text type="h2" className="room-header-title">
          {room.name}
        </Text>
      </div>
      <div className="msgs-list">
        {msgs.map((msg) => (
          <div className="msg-preview">
            <div className="msg-preview-value">
              {msg.author} : {msg.value}
            </div>
            <div className="msg-preview-timestamp">
              {_getFormattedTime(msg.timeSent)}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSendMsg();
        }}
      >
        <div className="msg-input">
          <input
            autofocus
            ref={elChatInput}
            value={chatInput}
            onChange={(e) => handleTyping(e)}
            type="text"
          />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  ) : (
    <Loader />
  );
};
