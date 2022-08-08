import { LOGIN_TYPE, GRAVATAR_TYPE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_TYPE:
    return {
      ...state,
      name: action.name,
    };
  case GRAVATAR_TYPE:
    return {
      ...state,
      email: action.gravatarEmail,
    };
  default:
    return state;
  }
};
export default userReducer;
