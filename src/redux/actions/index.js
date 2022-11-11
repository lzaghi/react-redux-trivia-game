export const USER_LOGIN = 'USER_LOGIN';
export const FETCHING = 'FETCHING';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAIL = 'FETCH_TOKEN_FAIL';
export const TIMER_DOWN = 'TIMER_DOWN';
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const SHOW_NEXT = 'SHOW_NEXT';
export const HIDE_NEXT = 'HIDE_NEXT';
export const CLICKED_ALT = 'CLICKED_ALT';
export const RESET_ALT = 'RESET_ALT';

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

export const timerDown = (timer) => ({
  type: TIMER_DOWN,
  timer,
});

export const increaseScore = (score) => ({
  type: INCREASE_SCORE,
  score,
});

export const showNext = () => ({
  type: SHOW_NEXT,
});

export const hideNext = () => ({
  type: HIDE_NEXT,
});

export const clickedAlt = () => ({
  type: CLICKED_ALT,
});

export const resetAlt = () => ({
  type: RESET_ALT,
});
