import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { fetchUser } from 'state/concepts/users/actions';
import UserWrapped, { UserContainer } from '../container';

jest.mock('state/concepts/users/actions', () => ({
  fetchUser: jest.fn(),
}));

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: () => ({ id: 'id' }),
}));

jest.mock('state/concepts/users/selectors', () => ({
  userSelector: jest.fn(() => ({
    firstName: '',
    lastName: '',
    about: '',
    timezone: '',
    country: '',
    city: '',
  })),
}));

describe('User container', () => {
  const userId = 'userId';
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const wrapper = shallow(<UserWrapped store={store} userId={userId} />);
  const container = diveTo(wrapper, UserContainer);

  it('renders User component', () => {
    expect(container).toMatchSnapshot();
  });

  it('calls getInitialProps', () => {
    expect(
      UserContainer.getInitialProps({ store, query: { userId } }),
    ).toEqual({ userId });

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(fetchUser());
  });

  describe('isSessionUser()', () => {
    it('returns if user is current session user', () => {
      expect(container.instance().isSessionUser).toEqual(false);

      container.setProps({ currentUser: { id: userId } });

      expect(container.instance().isSessionUser).toEqual(true);
    });
  });

  describe('canEdit()', () => {
    it('returns true if user is admin and current session user', () => {
      container.setProps({
        currentUser: { id: userId },
        user: { id: userId, roleName: 'administrator' },
      });

      expect(container.instance().canEdit).toEqual(true);
    });

    it('returns true if user is not admin but current session user', () => {
      container.setProps({
        currentUser: { id: userId },
        user: { id: userId, roleName: 'user' },
      });
      expect(container.instance().canEdit).toEqual(true);
    });

    it('returns true if user is not admin and not current session user', () => {
      container.setProps({
        currentUser: { id: 'otherId' },
        user: { id: userId, roleName: 'user' },
      });
      expect(container.instance().canEdit).toEqual(true);
    });

    it('returns false if user is admin and not current session user', () => {
      container.setProps({
        currentUser: { id: 'otherId' },
        user: { id: userId, roleName: 'administrator' },
      });
      expect(container.instance().canEdit).toEqual(false);
    });
  });
});
