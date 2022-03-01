import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';

import DashBoardMessages, { DashBoardMessagesContainer } from '../container';

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

describe('DashBoardMessages container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
  };

  const wrapper = shallow(<DashBoardMessages {...props} />);
  const container = diveTo(wrapper, DashBoardMessagesContainer);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('tests "getInitialProps" static method', () => {
    const ctx = {
      store,
    };

    it('should fetch specifications', async () => {
      await DashBoardMessagesContainer.getInitialProps(ctx);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, fetchSelf());
    });

    it('should not fetch specifications', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      await DashBoardMessagesContainer.getInitialProps(ctx);

      expect(store.dispatch).not.toHaveBeenCalledWith(fetchSelf());
    });
  });
});
