import { combineReducers } from 'redux';

import { SET_MOBILE_MENU_VISIBILITY } from 'state/concepts/dashboard/types';

const isMobileMenuVisible = (state = false, action) => {
  switch (action.type) {
    case SET_MOBILE_MENU_VISIBILITY:
      return action.isVisible;
    default:
      return state;
  }
};

export default combineReducers({
  isMobileMenuVisible,
});
