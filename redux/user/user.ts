import { USER_ACTIONS } from '../user/actions';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ACTIONS.USER_LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
