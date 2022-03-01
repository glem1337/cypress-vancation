import { setMobileMenuVisibility } from 'state/concepts/dashboard/actions';

describe('Dashboard actions', () => {
  it('setMobileMenuVisibility()', () => {
    const expectedAction = {
      type: 'dashboard/SET_MOBILE_MENU_VISIBILITY',
      isVisible: true,
    };

    expect(setMobileMenuVisibility(true))
      .toEqual(expectedAction);
  });
});
