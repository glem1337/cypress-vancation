import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import authenticate from 'lib/authenticate';
import { fetchSelf } from 'state/concepts/users/actions';
import * as selectors from 'state/concepts/session/selectors';
import { USERS_STATUS } from 'constants';
import SettingWrapper, { SettingContainer } from '../container';

jest.mock('lib/authenticate', () => jest.fn());

describe('AuthSocial container', () => {
  const store = configureStore()({
    session: { currentUser: {
        email: 'test@gmail.com',
        user: {
          lastName: 'lastName_test',
          firstName: 'firstName_test',
          avatarUrl: 'test_url',
        },
      } },
  });
  store.dispatch = jest.fn();

  const props = {
    router: {
      pathname: '/setting/account',
    },
    currentUser: {
      email: 'test@gmail.com',
      user: {
        lastName: 'lastName_test',
        firstName: 'firstName_test',
      },
    },
  };

  const wrapper = shallow(
    <SettingWrapper store={store} {...props}>
      <div>Test Child</div>
    </SettingWrapper>,
  );
  const container = diveTo(wrapper, SettingContainer);
  const instance = container.instance();

  beforeEach(() => {
    authenticate.mockClear();
    store.dispatch.mockClear();
  });

  it('renders AuthSocial component', () => {
    expect(container).toMatchSnapshot();
  });

  it('call getter getActive()', () => {
    expect(instance.getActive).toEqual('account');
  });

  describe('getInitialProps()', () => {
    describe('when user exist', () => {
      beforeEach(() => {
        authenticate.mockReturnValueOnce(true);
      });

      it('calls authenticate', () => {
        SettingContainer.getInitialProps({ store });
        expect(authenticate).toHaveBeenCalledWith(USERS_STATUS.USER, { store });
      });

      it('when user exist', () => {
        SettingContainer.getInitialProps({ store });
        expect(store.dispatch).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('when user exist', () => {
    beforeEach(() => {
      authenticate.mockReturnValueOnce(true);
      jest.spyOn(selectors, 'currentUserSelector').mockReturnValueOnce(undefined);
    });

    it('calls authenticate', () => {
      SettingContainer.getInitialProps({ store });
      expect(authenticate).toHaveBeenCalledWith(USERS_STATUS.USER, { store });
    });

    it('when user exist', () => {
      SettingContainer.getInitialProps({ store });
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(fetchSelf());
    });
  });

  describe('when user is not authorized', () => {
    beforeEach(() => {
      authenticate.mockReturnValueOnce(false);
    });

    it('calls authenticate is not authorized', () => {
      SettingContainer.getInitialProps({ store });
      expect(authenticate).toHaveBeenCalledWith(USERS_STATUS.USER, { store });
    });

    it('check call when is not authorized', () => {
      SettingContainer.getInitialProps({ store });
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
