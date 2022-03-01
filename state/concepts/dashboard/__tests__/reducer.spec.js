import reducer from 'state/concepts/dashboard/reducer';
import * as types from 'state/concepts/dashboard/types';

describe('Dashboard reducers', () => {
  describe('isMobileMenuVisible reducer', () => {
    it('type SET_MOBILE_MENU_VISIBLE', () => {
      const action = {
        type: types.SET_MOBILE_MENU_VISIBILITY,
        isVisible: true,
      };

      expect(reducer(undefined, action).isMobileMenuVisible)
        .toBe(true);
    });
  });
});
