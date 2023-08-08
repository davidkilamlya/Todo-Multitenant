const initialState = {
  userName: null,
  id: null,
  email: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return {
        ...state,
        userName: action.payload.userName,
        id: action.payload._id,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default userReducer;
