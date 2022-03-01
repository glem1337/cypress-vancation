import { omit } from 'ramda';
import * as types from './types';

const initialState = {};

const notificationsReducer = (state = initialState, action) => {
  const { notification } = action;
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      notification.id = notification.id || `${notification.context}_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
      return {
        ...state,
        [notification.context]: {
          ...state[notification.context],
          [notification.id]: notification,
        },
      };
    case types.HIDE_NOTIFICATION:
      return {
        ...state,
        [action.context]: omit([action.id], state[action.context]),
      };
    default:
      return state;
  }
};

export default notificationsReducer;
