import { shallow } from 'enzyme';

import UserHeaderMenuMobileComponent from '../component';

describe('UserHeaderMenuMobileComponent', () => {
  const props = {
    active: 'account',
    currentUser: {
      email: 'test-email',
      user: {
        firstName: 'firstName',
        lastName: 'lastName',
        avatarUrl: 'test_url',
      },
    },
    onClose: jest.fn(),
    handlerSignOut: jest.fn(),
    visible: false,
    showOwnersDashboardBtn: true,
  };

  const component = shallow(<UserHeaderMenuMobileComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when currentUser is null', () => {
    component.setProps({ currentUser: null });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when showOwnersDashboardBtn is equal false', () => {
    component.setProps({ showOwnersDashboardBtn: false });

    expect(component).toMatchSnapshot();
  });
});
