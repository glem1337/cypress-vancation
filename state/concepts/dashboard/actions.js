import { SET_MOBILE_MENU_VISIBILITY } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setMobileMenuVisibility = isVisible => ({
  type: SET_MOBILE_MENU_VISIBILITY,
  isVisible,
});
