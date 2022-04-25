import { SET_USER_LOGIN, SET_USER_LOGOUT } from './constants';

const initState = {
  todos: [],
  todoInput: '',
  user: { status: false },
}

function reducer(state, action) {
  switch (action.type) {
    case SET_USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_LOGOUT:
      return {
        user: action.payload,
      };
    default:
      throw new Error('Invalid action.');
  }
}

export { initState };
export default reducer;
