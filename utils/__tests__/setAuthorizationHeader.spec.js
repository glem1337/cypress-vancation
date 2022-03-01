import setAuthorizationHeader from '../setAuthorizationHeader';

describe('setAuthorizationHeader()', () => {
  it('sets auth headers', () => {
    const httpClient = {
      defaults: {
        headers: {
          common: {
            Authorization: '',
          },
        },
      },
    };
    setAuthorizationHeader(httpClient, 'accessToken');

    expect(httpClient.defaults.headers.common.Authorization).toEqual('Bearer accessToken');
  });
});
