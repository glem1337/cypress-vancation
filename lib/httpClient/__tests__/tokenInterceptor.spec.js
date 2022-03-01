import cookies from 'next-cookies';

import tokenInterceptor from '../tokenInterceptor';

jest.mock('next-cookies', () => jest.fn(() => ({
  access: 'new token',
})));

describe('tokenInterceptor()', () => {
  const makeConfig = (token) => ({
    headers: {
      common: { Authorization: token },
    },
  });
  const ctx = {};

  it('snapshot', () => {
    expect(tokenInterceptor).toMatchSnapshot();
  });

  it('sets token if it is undefined and cookies have token', () => {
    const config = makeConfig(undefined);
    tokenInterceptor(ctx)(config);

    expect(config.headers.common.Authorization).toEqual('Bear new token');
  });

  it('sets token if it is undefined and cookies are empty', () => {
    cookies.mockReturnValueOnce({});
    const config = makeConfig(undefined);
    tokenInterceptor(ctx)(config);

    expect(config.headers.common.Authorization).toEqual(null);
  });
});
