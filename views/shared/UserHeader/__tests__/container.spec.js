import { shallow } from 'enzyme';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import configureStore from 'redux-mock-store';
import { userSignOut } from 'state/concepts/session/actions';
import { fetchOwnerProfile } from 'state/concepts/owner/actions';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';

import mockedOwnerProfile from 'views/__mocks__/mockedOwnerProfile';
import UserHeader, { UserHeaderContainer } from '../container';

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

jest.mock('state/concepts/header/selectors', () => ({
  isHeaderExpandedSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/owner/selectors', () => ({
  ownerProfileSelector: jest.fn(() => mockedOwnerProfile),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<UserHeader {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, UserHeaderContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('UserHeader container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    active: 'account',
    userSignOut: jest.fn(),
    currentUser: {
      email: 'test@gmail.com',
      firstName: 'test_firstName',
      lastName: 'test_lastName',
      avatarUrl: 'test_url',
    },
    store,
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      container,
      instance,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('renders UserHeader component', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `componentDidMount` instance method', () => {
    it('should dispatch', () => {
      instance.componentDidMount();

      expect(store.dispatch).toHaveBeenCalledWith(fetchOwnerProfile());
    });

    it('shouldn`t dispatch', () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);
      instance.componentDidMount();

      expect(store.dispatch).not.toHaveBeenCalledWith();
    });
  });

  describe('toggleAccountDropdown visible', () => {
    it('toggleAccountWidget show', () => {
      instance.toggleAccountDropdown(true);
      expect(instance.state.accountDropdownVisible).toBe(true);
    });

    it('toggleAccountWidget hidden', () => {
      instance.toggleAccountDropdown(false);
      expect(instance.state.accountDropdownVisible).toBe(false);
    });
  });

  it('userSignOut', () => {
    instance.handlerSignOut();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(userSignOut());
  });

  describe('handleMobileMenu', () => {
    it('handleMobileMenu open', () => {
      instance.handleMobileMenuOpen();
      expect(instance.state.mobileMenuVisible).toBe(true);
    });

    it('handleMobileMenu close', () => {
      instance.handleMobileMenuClose();
      expect(instance.state.mobileMenuVisible).toBe(false);
    });
  });

  it('setMenuGroupVisibility', () => {
    instance.setMenuGroupVisibility(true);

    expect(instance.state.areItemsGrouped).toBe(true);
  });
});
