import { shallow } from 'enzyme';

import UserDropdownComponent from '../component';

describe('UserDropdownComponent', () => {
  const defaultProps = {
    active: 'account',
    currentUser: {
      email: 'test-email',
      user: {
        firstName: 'firstName',
        lastName: 'lastName',
        avatarUrl: 'test_url',
      },
    },
    onVisibleChange: jest.fn(),
    handlerSignOut: jest.fn(),
    visible: false,
    getPopupContainer: jest.fn(),
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<UserDropdownComponent {...defaultProps} />);
  });

  it('UserDropdownComponent default props snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('UserDropdownComponent currentUser empty snapshot', () => {
    component.setProps({
      currentUser: null,
    });

    expect(component).toMatchSnapshot();
  });

  it('UserDropdownComponent visible true snapshot', () => {
    component.setProps({
      visible: true,
    });

    expect(component).toMatchSnapshot();
  });
});
