const initialState = {
  chats: [],
};

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_CHAT":
      return {
        ...state,
        chats: [...state.chats, action.chat],
      };
    case "CREATE_MSG":
      return {
        ...state,
        chats: state.chats.map((chat, i) =>
          action.msg.chatId === chat._id
            ? { ...chat, msgs: [...chat.msgs, action.msg] }
            : chat
        ),
      };
    case "SET_CHATS":
      return {
        ...state,
        chats: [...action.chats],
      };

    default:
      return state;
  }
}
