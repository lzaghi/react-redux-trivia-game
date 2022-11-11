export const USER_LOGIN = 'USER_LOGIN';
export const FETCHING = 'FETCHING';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAIL = 'FETCH_TOKEN_FAIL';
export const TIMER_DOWN = 'TIMER_DOWN';

export function userLogin(gravatarEmail, name) {
  return {
    type: USER_LOGIN,
    gravatarEmail,
    name,
  };
}

export const fetchToken = () => ({
  type: FETCHING,
});

export const fetchTokenSuccess = (data) => ({
  type: FETCH_TOKEN_SUCCESS,
  data,
});

export const fetchTokenFail = (error) => ({
  type: FETCH_TOKEN_FAIL,
  error,
});

export const fetchTokenAPI = () => (dispatch) => {
  dispatch(fetchToken());
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((json) => dispatch(fetchTokenSuccess(json)))
    .catch((error) => dispatch(fetchTokenFail(error)));
};

export const timerZero = (timer) => ({
  type: TIMER_DOWN,
  timer,
});
