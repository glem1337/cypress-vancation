import { omit } from 'ramda';

import { USER_SIGNOUT } from 'state/concepts/session/types';

import * as types from './types';

const initialState = {};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MESSAGE:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          messageType: action.messageType,
          messageTitle: action.messageTitle,
          messageSubTitle: action.messageSubTitle,
          duration: action.duration,
        },
      };
    case types.HIDE_MESSAGE:
      return omit([action.id], state);
    case types.HIDE_ALL:
    case USER_SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default notificationsReducer;
