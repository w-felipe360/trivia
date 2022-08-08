const GET_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const setLocalStorage = (response) => {
  localStorage.setItem('token', response);
};

export const getToken = async () => {
  const response = await fetch(GET_TOKEN);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const getQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
