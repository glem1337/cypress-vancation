import React from 'react';
import { shallow } from 'enzyme';

import UserDropdown from '../container';

describe('UserDropdown container tests', () => {
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
    onVisibleChange: jest.fn(),
    handlerSignOut: jest.fn(),
    visible: false,
    getPopupContainer: jest.fn(),
  };

  const container = shallow(<UserDropdown {...props} />);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `getPopupContainer` instance method', () => {
    const div = document.createElement('div');
    div.id = 'main-account-header__user';
    document.body.appendChild(div);

    expect(instance.getPopupContainer()).toMatchSnapshot();
  });
});
