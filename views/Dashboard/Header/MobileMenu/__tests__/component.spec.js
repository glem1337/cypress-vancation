import React from 'react';
import { shallow } from 'enzyme';

import ROUTES from 'constants/routes';

import MobileMenu from '../component';

describe('MobileMenu component tests', () => {
  const props = {
    isCampersListVisible: true,
    isVisible: true,
    closeMobileMenu: jest.fn(),
    signOut: jest.fn(),
    activeKey: 'activeKey',
    camperId: 'camperId',
    currentUser: {
      email: 'test@gmail.com',
      user: {
        lastName: 'lastName_test',
        firstName: 'firstName_test',
        avatarUrl: 'test_url',
      },
    },
    hideItem: ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.DETAILS.KEY,
  };

  const component = shallow(<MobileMenu {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when isCampersListVisible === false', () => {
    component.setProps({
      isCampersListVisible: false,
    });

    expect(component).toMatchSnapshot();
  });

  it('hideItem is equal all campers', () => {
    component.setProps({
      hideItem: ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.KEY,
    });

    const lastLink = component.find('.d-none').parent();

    expect(lastLink.props().href.pathname).toBe(
      ROUTES.OWNER_DASHBOARD.ALL_CAMPERS.PATH,
    );
  });
});
