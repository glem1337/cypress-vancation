import { shallow } from 'enzyme';
import UserHeaderComponent from '../component';

describe('UserHeader component', () => {
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
    isAccountDropdownVisible: false,
    isMobileMenuVisible: false,
    onAccountDropdownToggle: jest.fn(),
    onMobileMenuOpen: jest.fn(),
    onMobileMenuClose: jest.fn(),
    handlerSignOut: jest.fn(),
    getPopupContainer: jest.fn(),
    isSearchVisible: true,
    isUserLoggedIn: true,
    isInputPairVisible: true,
    onStartInputFocus: jest.fn(),
    SearchSection: null,
    isMobileHeaderExpanded: false,
    areItemsGrouped: true,
    ownerProfile: {
      campersCount: 12,
    },
  };

  let container = null;

  beforeEach(() => {
    container = shallow(<UserHeaderComponent {...defaultProps} />);
  });

  it('with default props', () => {
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when currentUser is null', () => {
    container.setProps({
      currentUser: null,
    });

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when isMobileHeaderExpanded is true', () => {
    container.setProps({
      isMobileHeaderExpanded: true,
    });

    expect(container).toMatchSnapshot();
  });
});
