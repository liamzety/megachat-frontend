const initialState = {
  rooms: [],
};

export function roomReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_ROOM":
      return {
        ...state,
        rooms: [ ...state.rooms, action.room],
      };
    case "SET_ROOMS":
      return {
        ...state,
        rooms: [...action.rooms],
      };

    default:
      return state;
  }
}
