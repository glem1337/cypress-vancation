import cookies from 'component-cookie';
import ROUTES from 'constants/routes';
import setRouterCookies from '../setPagesCookies';

jest.mock('component-cookie');

describe('setUserCookies()', () => {
  it('sets user cookies', () => {
    const prevPage = { path: '/test/prevPage' };
    const currentPage = { path: '/test/currentPage' };
    const cookieOptions = { path: ROUTES.INDEX.PATH };

    setRouterCookies({ prevPage, currentPage });

    expect(cookies).toHaveBeenCalledTimes(2);
    expect(cookies).toHaveBeenNthCalledWith(1, 'prevPage', prevPage, cookieOptions);
    expect(cookies).toHaveBeenNthCalledWith(2, 'currentPage', currentPage, cookieOptions);
  });
});
