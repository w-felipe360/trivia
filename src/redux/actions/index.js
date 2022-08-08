export const userLoginAction = (payload) => ({
  type: 'LOGIN_TYPE',
  payload,
});
export const GRAVATAR_TYPE = 'GRAVATAR_TYPE';
export const gravatarAction = (gravatarEmail) => ({
  type: 'GRAVATAR_TYPE',
  gravatarEmail,
});
export const LOGIN_TYPE = 'LOGIN_TYPE';
