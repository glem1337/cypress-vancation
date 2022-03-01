import cookies from 'component-cookie';

import removeUserCookies from '../removeUserCookies';

jest.mock('component-cookie');

describe('setUserCookies()', () => {
  it('sets user cookies', () => {
    removeUserCookies();

    expect(cookies).toHaveBeenCalledTimes(4);
    expect(cookies).toHaveBeenNthCalledWith(1, 'currentUser', null, { path: '/' });
    expect(cookies).toHaveBeenNthCalledWith(2, 'access', null, { path: '/' });
    expect(cookies).toHaveBeenNthCalledWith(3, 'csrf', null, { path: '/' });
    expect(cookies).toHaveBeenNthCalledWith(4, 'refresh', null, { path: '/' });
  });
});
