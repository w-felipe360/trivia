import { LOGIN_TYPE, GRAVATAR_TYPE, TIMER_TYPE, SCORE_TYPE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  email: '',
  timer: 30,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_TYPE:
    return {
      ...state,
      name: action.name,
    };
  case GRAVATAR_TYPE:
    return {
      ...state,
      email: action.email,
    };
  case TIMER_TYPE:
    return {
      ...state,
      timer: action.timer - 1,
    };
  case SCORE_TYPE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};
export default player;
