import nodeCookie from 'cookie';
import browserCookie from 'component-cookie';
import removeCookieIsomorphic from '../removeCookieIsomorphic';

jest.mock('component-cookie', () => jest.fn());
describe('removeCookieIsomorphic()', () => {
  const { window } = global;

  const name = 'test';
  const res = {
    setHeader: jest.fn(),
    getHeader: jest.fn(),
    finished: false,
  };
  beforeEach(() => {
    res.setHeader.mockClear();
    res.getHeader.mockClear();
  });

  afterAll(() => {
    global.window = window;
  });

  describe('removes cookie on SSR', () => {
    it('when response is open', () => {
      delete global.window;

      const prevCookie = ['testPrev='];
      res.getHeader.mockReturnValueOnce(prevCookie);
      removeCookieIsomorphic({ res, isServer: true }, name);
      expect(res.getHeader).toHaveBeenCalledWith('Set-Cookie');
      expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', [
        ...prevCookie,
        nodeCookie.serialize(name, '', { expires: new Date(), path: '/' }),
      ]);
    });
    it('when response is finished', () => {
      removeCookieIsomorphic({ res: { ...res, finished: true }, isServer: true }, name);
      expect(res.setHeader).toHaveBeenCalledTimes(0);
    });
  });

  it('removes cookie in browser', () => {
    global.window = window;

    removeCookieIsomorphic({ isServer: false }, name);

    expect(browserCookie).toHaveBeenCalledWith(name, null, { path: '/' });
  });
});
