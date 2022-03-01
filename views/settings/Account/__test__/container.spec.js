import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { userCheckEmailVerificationToken } from 'state/concepts/session/actions';

import AccountWrapper, { AccountContainer } from '../container';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    currentUser: {
      email: 'test@gmail.com',
      user: {
        lastName: 'lastName_test',
        firstName: 'firstName_test',
        avatarUrl: 'test_url',
      },
    },
  })),
}));

describe('Account settings container', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      query: {
        email_token: 'email_token',
      },
    },
  };

  const wrapper = shallow(<AccountWrapper {...props} />);
  const container = diveTo(wrapper, AccountContainer);
  const instance = container.instance();

  it('Account settings container snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('handlerAlertNewPassword()', () => {
    it('call true', () => {
      expect(instance.state.showAlertNewPassword).toEqual(false);
      instance.handlerAlertNewPassword(true);
      expect(instance.state.showAlertNewPassword).toEqual(true);
    });

    it('call false', () => {
      expect(instance.state.showAlertNewPassword).toEqual(true);
      instance.handlerAlertNewPassword(false);
      expect(instance.state.showAlertNewPassword).toEqual(false);
    });
  });

  it('checks `componentDidMount` instance method', () => {
    instance.componentDidMount();

    const {
      router: {
        // eslint-disable-next-line camelcase
        query: { email_token },
      },
    } = props;

    expect(store.dispatch).toHaveBeenCalledWith(
      userCheckEmailVerificationToken(email_token),
    );
  });
});
