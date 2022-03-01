import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import removeUserCookies from 'utils/removeUserCookies';
import ROUTES from 'constants/routes';
import redirect from 'utils/redirect';
import userSignOut from '../userSignOut';
import { userSignOutSuccess } from '../../actions';

jest.mock('utils/removeUserCookies');
jest.mock('utils/redirect');

describe('userSignOut', () => {
  let dispatch;
  const action = {};

  const beforeFunction = httpClient => () => {
    jest.clearAllMocks();
    removeUserCookies.mockClear();
    dispatch = jest.fn();
    userSignOut.process({ action, httpClient }, dispatch, jest.fn());
  };

  const httpClient = mockHttpClient({ method: 'delete', response: {} });

  httpClient.defaults = {
    headers: {
      'X-Refresh-Token': 'test_token',
    },
  };
  beforeEach(beforeFunction(httpClient));

  it('has valid attributes', () => {
    expect(userSignOut).toMatchSnapshot();
  });

  it('remove cookies', () => {
    expect(removeUserCookies).toHaveBeenCalledTimes(1);
  });

  it('dispatches actions', () => {
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(userSignOutSuccess());
  });

  it('redirects', () => {
    expect(redirect).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
  });
});
