import { combineReducers } from 'redux';

import {
  SET_EXPAND_CONDITION,
  SET_INPUT_VISIBILITY,
} from './types';

const isExpanded = (state = false, action) => {
  switch (action.type) {
    case SET_EXPAND_CONDITION:
      return action.isExpanded;
    default:
      return state;
  }
};

const isInputVisible = (state = false, action) => {
  switch (action.type) {
    case SET_INPUT_VISIBILITY:
      return action.isVisible;
    default:
      return state;
  }
};

export default combineReducers({
  isExpanded,
  isInputVisible,
});
