export const LOGIN_TYPE = 'LOGIN_TYPE';
export const GRAVATAR_TYPE = 'GRAVATAR_TYPE';
export const TIMER_TYPE = 'TIMER_TYPE';
export const SCORE_TYPE = 'SCORE_TYPE';
export const ASSERTIONS_TYPE = 'ASSERTIONS_TYPE';
export const RESET_TIMER_TYPE = 'RESET_TIMER_TYPE';

export const userLoginAction = (name) => ({
  type: LOGIN_TYPE,
  name,
});

export const assertionsAction = (assertions) => ({
  type: ASSERTIONS_TYPE,
  assertions,
});

export const gravatarAction = (email) => ({
  type: GRAVATAR_TYPE,
  email,
});

export const setTimer = (timer) => ({
  type: TIMER_TYPE,
  timer,
});

export const setResetTimer = () => ({
  type: RESET_TIMER_TYPE,
});

export const scoreAction = (score) => ({
  type: SCORE_TYPE,
  score,
});
