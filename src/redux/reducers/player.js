import { TIMER_DOWN,
  USER_LOGIN,
  INCREASE_SCORE, SHOW_NEXT, HIDE_NEXT, CLICKED_ALT, RESET_ALT } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: 30,
  next: false,
  setStyle: false,
  clicked: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  case TIMER_DOWN:
    return {
      ...state,
      timer: action.timer - 1,
    };
  case INCREASE_SCORE:
    return {
      ...state,
      score: action.score + state.score,
    };
  case SHOW_NEXT:
    return {
      ...state,
      next: true,
    };
  case HIDE_NEXT:
    return {
      ...state,
      next: false,
      timer: 30,
    };
  case CLICKED_ALT:
    return {
      ...state,
      setStyle: true,
      clicked: true,
    };
  case RESET_ALT:
    return {
      ...state,
      setStyle: false,
      clicked: false,
    };
  default:
    return state;
  }
};

export default player;
