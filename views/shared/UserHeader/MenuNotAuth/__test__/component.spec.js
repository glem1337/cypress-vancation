import { shallow } from 'enzyme';

import UserHeaderMenuMobileComponent from '../component';

describe('UserHeaderMenuMobileComponent', () => {
  const props = {
    active: 'account',
    onClose: jest.fn(),
    handlerSignOut: jest.fn(),
    visible: false,
    menuToggle: jest.fn(),
  };

  const component = shallow(<UserHeaderMenuMobileComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when visible === true', () => {
    component.setProps({ visible: true });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when currentUser === null', () => {
    component.setProps({ currentUser: {
      email: 'test-email',
      user: {
        firstName: 'firstName',
        lastName: 'lastName',
        avatarUrl: 'test_url',
      },
    } });

    expect(component).toMatchSnapshot();
  });
});
