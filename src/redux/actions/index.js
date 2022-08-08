export const LOGIN_TYPE = 'LOGIN_TYPE';
export const GRAVATAR_TYPE = 'GRAVATAR_TYPE';

export const userLoginAction = (name) => ({
  type: LOGIN_TYPE,
  name,
});

export const gravatarAction = (gravatarEmail) => ({
  type: GRAVATAR_TYPE,
  gravatarEmail,
});
