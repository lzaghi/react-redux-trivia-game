import { FETCHING, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAIL } from '../actions';

const INITIAL_STATE = {
  token: '',
  isLoading: false,
  responseCode: 0,
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCHING:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_TOKEN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      token: action.data.token,
      responseCode: action.data.response_code,
    };
  case FETCH_TOKEN_FAIL:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default token;
