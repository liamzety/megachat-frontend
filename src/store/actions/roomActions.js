import { roomService } from "../../services/roomSevice";

export function createRoom(roomDetails) {
  return async (dispatch) => {
    const room = await roomService.create(roomDetails);
    dispatch({ type: "CREATE_ROOM", room });
  };
}

export function loadRooms() {
  return async (dispatch) => {
    const rooms = await roomService.query();
    dispatch({ type: "SET_ROOMS", rooms });
  };
}
