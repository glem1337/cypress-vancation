import React from 'react';
import { shallow } from 'enzyme';

import UserDropdown from '../component';

describe('UserDropdown component tests', () => {
  const props = {
    signOut: jest.fn(),
    currentUser: {
      email: 'test@gmail.com',
      user: {
        lastName: 'lastName_test',
        firstName: 'firstName_test',
        avatarUrl: 'test_url',
      },
    },
  };

  const component = shallow(<UserDropdown {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when user is null', () => {
    component.setProps({ currentUser: null });

    expect(component).toMatchSnapshot();
  });
});
