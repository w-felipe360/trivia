import { LOGIN_TYPE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_TYPE:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatar,
    };
  default:
    return state;
  }
};

export default user;
