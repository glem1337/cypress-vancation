import { combineReducers } from 'redux';

import * as types from './types';

const currentUser = (state = null, action) => {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return action.currentUser;
    case types.USER_LOGOUT_SUCCESS:
      return null;
    case types.USER_SET_EMAIL_VERIFICATION:
      return {
        ...state,
        emailVerified: action.verified,
      };
    default:
      return state;
  }
};

const sessionReducer = combineReducers({
  currentUser,
});

export default sessionReducer;
