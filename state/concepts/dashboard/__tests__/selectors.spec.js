import { isMobileMenuVisibleSelector } from '../selectors';

describe('Dashboard selectors', () => {
  describe('isMobileMenuVisibleSelector()', () => {
    const state = {
      dashboard: {
        isMobileMenuVisible: true,
      },
    };

    it('returns isMobileMenuVisible', () => {
      expect(isMobileMenuVisibleSelector(state))
        .toBe(true);
    });
  });
});
