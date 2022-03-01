import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';

import TermsOfService, { TermsOfServiceContainer } from '../container';

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

describe('TermsOfService container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const wrapper = shallow(<TermsOfService store={store} />);
  const container = diveTo(wrapper, TermsOfServiceContainer);

  beforeEach(() => {
    store.dispatch.mockClear();
  });

  it('renders AuthSocial component', () => {
    expect(container).toMatchSnapshot();
  });

  describe('tests "getInitialProps" static method', () => {
    const ctx = {
      store,
    };

    it('should fetch user', async () => {
      await TermsOfServiceContainer.getInitialProps(ctx);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, fetchSelf());
    });

    it('should not fetch user', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      await TermsOfServiceContainer.getInitialProps(ctx);

      expect(store.dispatch).not.toHaveBeenCalledWith(fetchSelf());
    });
  });
});
