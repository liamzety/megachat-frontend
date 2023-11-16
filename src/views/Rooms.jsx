import React from "react";
import { useEffect } from "react";
import { createRoom, loadRooms } from "../store/actions/roomActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Text } from "../aux-cmps/Text";
import { RoomPreview } from "../cmps/RoomPreview";

export function Rooms() {
  const { loggedUser } = useSelector((state) => state.userReducer);
  const { rooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadRooms());
  }, []);
  const handleRoomClick = (roomId) => {
    if (!loggedUser) {
      alert("You must be logged in to view this page");
      return;
    }

    navigate(`/rooms/${roomId}`);
  };

  return (
    <section className="rooms">
      <Text type="h1"> Created Rooms: </Text>
      {rooms.map((room) => (
        <RoomPreview
          onRoomClick={() => handleRoomClick(room._id)}
          name={room.name}
        />
      ))}
    </section>
  );
}
