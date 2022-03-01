import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { setMobileMenuVisibility } from 'state/concepts/dashboard/actions';

import Header, { HeaderContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/dashboard/selectors', () => ({
  isMobileMenuVisibleSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    session: {
      currentUser: {
        email: 'test@gmail.com',
        user: {
          lastName: 'lastName_test',
          firstName: 'firstName_test',
          avatarUrl: 'test_url',
        },
      },
    },
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  ownerCampersPaginationSelector: jest.fn(() => ({
    total: 6,
    number: 1,
    size: 10,
  })),
}));

describe('Header container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    activeTabKey: 'activeTabKey',
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<Header {...props} />);
    container = diveTo(wrapper, HeaderContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `setMobileMenuVisibility` instance method', () => {
    it('with true', () => {
      instance.setMobileMenuVisibility(true)();

      expect(store.dispatch)
        .toHaveBeenCalledWith(setMobileMenuVisibility(true));
    });

    it('with false', () => {
      instance.setMobileMenuVisibility(false)();

      expect(store.dispatch)
        .toHaveBeenCalledWith(setMobileMenuVisibility(false));
    });
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(store.dispatch).toHaveBeenCalledWith(setMobileMenuVisibility(false));
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('when prev and current props are equal', () => {
      instance.componentDidUpdate({ isMobileMenuVisible: true });

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('when prev and current props aren`t equal', () => {
      instance.componentDidUpdate({ isMobileMenuVisible: false });

      expect(store.dispatch).toHaveBeenCalledWith(
        setMobileMenuVisibility(true),
      );
    });
  });
});
