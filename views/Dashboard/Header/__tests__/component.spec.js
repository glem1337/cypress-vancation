import React from 'react';
import { shallow } from 'enzyme';

import HeaderComponent from '../component';

describe('HeaderComponent component tests', () => {
  const props = {
    signOut: jest.fn(),
    currentUser: null,
    activeTabKey: 'activeTabKey',
    isMobileMenuVisible: true,
    setMobileMenuVisibility: jest.fn(() => jest.fn()),
    ownerCampersPagination: { total: 6 },
  };

  const component = shallow(<HeaderComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when total is 0', () => {
    component.setProps({
      ownerCampersPagination: { total: 0 },
    });

    expect(component).toMatchSnapshot();
  });
});
