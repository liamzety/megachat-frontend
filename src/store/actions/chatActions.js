import { chatService } from "../../services/chatSevice";

export function createChat(chatDetails) {
  return async (dispatch) => {
    const chat = await chatService.create(chatDetails);
    dispatch({ type: "CREATE_CHAT", chat });
  };
}
export function createMsg(msg) {
  return async (dispatch) => {
    await chatService.createMsg(msg);
    dispatch({ type: "CREATE_MSG", msg });
  };
}

export function loadChats() {
  return async (dispatch) => {
    const chats = await chatService.query();
    dispatch({ type: "SET_CHATS", chats });
  };
}
