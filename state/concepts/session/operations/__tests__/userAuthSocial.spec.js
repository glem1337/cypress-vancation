import userAuthSocial from 'state/concepts/session/operations/userAuthSocial';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import { userAuthSocialRoute } from 'lib/apiRoutes';
import { userCreateSession } from 'state/concepts/session/actions';
import { dataApiFailure, dataApiRequest } from 'state/data/actions';
import { currentUserSuccessResponse } from '../../__mocks__/currentUser';
import { userAuthSocialEndpoint } from '../../endpoints';

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('userAuthSocial', () => {
  let dispatch;

  const action = {
    type: 'test_type',
    token: 'social_api_key_0000',
    social: 'example_social',
  };

  const { endpoint } = userAuthSocialEndpoint(action.social);

  const headers = { 'Social-Net-Token': action.token };

  const beforeFunction = (httpClient) => () => {
    jest.clearAllMocks();

    dispatch = jest.fn();
    userAuthSocial.process({ action, httpClient }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(userAuthSocial).toMatchSnapshot();
  });

  describe('success dispatch userCreateSession', () => {
    const httpClient = mockHttpClient({ method: 'post', response: currentUserSuccessResponse.data });

    httpClient.defaults = { headers };
    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right header SocialNetToken', () => {
      expect(httpClient.post)
        .toHaveBeenCalledWith(userAuthSocialRoute(action.social), null, { headers });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        userCreateSession(currentUserSuccessResponse.data.data, false),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'post', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', async () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ endpoint, error }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledTimes(1);
    });
  });
});
