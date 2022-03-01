import cookies from 'component-cookie';

import setUserCookies from '../setUserCookies';

jest.mock('component-cookie');

describe('setUserCookies()', () => {
  it('sets user cookies', () => {
    const tokens = { access: 'accessToken', csrf: 'csrfToken', refresh: 'refreshToken' };
    const user = { id: '1' };
    setUserCookies(user, tokens);

    expect(cookies).toHaveBeenCalledTimes(4);
    expect(cookies).toHaveBeenNthCalledWith(1, 'currentUser', JSON.stringify(user), { path: '/' });
    expect(cookies).toHaveBeenNthCalledWith(2, 'access', tokens.access, { path: '/' });
    expect(cookies).toHaveBeenNthCalledWith(3, 'csrf', tokens.csrf, { path: '/' });
    expect(cookies).toHaveBeenNthCalledWith(4, 'refresh', tokens.refresh, { path: '/' });
  });
});
