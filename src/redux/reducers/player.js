import { TIMER_DOWN, USER_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: 30,
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
  default:
    return state;
  }
};

export default player;
