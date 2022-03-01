import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import normalize from 'json-api-normalizer';
import build from 'redux-object';

import { fetchSelf } from 'state/concepts/users/actions';
import * as selectors from 'state/concepts/session/selectors';
import { loginSuccessResponse } from 'state/concepts/session/__mocks__/loginResponse';
import fetchSelfResponse from 'state/concepts/users/__mocks__/fetchSelfResponse';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import authenticate from 'lib/authenticate';
import UserLayoutWrapped, { UserLayoutContainer } from '../container';

jest.mock('state/concepts/users/actions', () => ({
  fetchSelf: jest.fn(() => 'Test Action'),
}));

jest.mock('lib/authenticate', () => jest.fn());

describe('UserLayout container', () => {
  const { id } = loginSuccessResponse.data.data;
  const sessionCurrentUser = build(normalize(loginSuccessResponse.data), 'account', id);
  const currentUserResponse = normalize(fetchSelfResponse.data);
  const store = configureStore()({
    session: { currentUser: sessionCurrentUser },
    data: currentUserResponse,
  });
  store.dispatch = jest.fn();

  const wrapper = shallow(
    <UserLayoutWrapped store={store}><div>Test Child</div></UserLayoutWrapped>,
  );
  const container = diveTo(wrapper, UserLayoutContainer);
  const instance = container.instance();

  beforeEach(() => {
    authenticate.mockClear();
    fetchSelf.mockClear();
    store.dispatch.mockClear();
  });

  it('renders UserLayout component', () => {
    expect(container).toMatchSnapshot();
  });

  it('toggleSidebar()', () => {
    expect(instance.state.sidebarVisible).toEqual(false);
    instance.toggleSidebar();
    expect(instance.state.sidebarVisible).toEqual(true);
  });

  describe('getInitialProps()', () => {
    describe('when user is authorized', () => {
      beforeEach(() => {
        authenticate.mockReturnValueOnce(true);
      });

      it('calls authenticate', () => {
        UserLayoutContainer.getInitialProps({ store });
        expect(authenticate).toHaveBeenCalledWith('user', { store });
      });

      describe('when user exist', () => {
        it('does not call fetchSelf()', () => {
          UserLayoutContainer.getInitialProps({ store });
          expect(fetchSelf).toHaveBeenCalledTimes(0);
          expect(store.dispatch).toHaveBeenCalledTimes(0);
        });
      });

      describe('when user not exist', () => {
        beforeEach(() => {
          jest.spyOn(selectors, 'currentUserSelector').mockReturnValueOnce(undefined);
        });

        it('does call fetchSelf()', () => {
          UserLayoutContainer.getInitialProps({ store });
          expect(fetchSelf).toHaveBeenCalledTimes(1);
          expect(store.dispatch).toHaveBeenCalledWith(fetchSelf());
        });
      });
    });

    it('when user is not authorized', () => {
      authenticate.mockReturnValueOnce(false);
      UserLayoutContainer.getInitialProps({ store });
      expect(authenticate).toHaveBeenCalledWith('user', { store });
      expect(fetchSelf).toHaveBeenCalledTimes(0);
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
