import ROUTES from 'constants/routes';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';

import redirect from 'utils/redirect';
import {
  dataApiFailure,
  dataApiRequest,
  dataApiSuccess,
} from 'state/data/actions';
import { userCheckEmailVerificationTokenEndpoint } from 'state/concepts/session/endpoints';
import { userSetEmailVerification } from 'state/concepts/session/actions';
import { showMessage } from 'state/flash-messages/actions';
import userCheckEmailVerificationToken from '../userCheckEmailVerificationToken';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('utils/redirect', () => jest.fn());

describe('userCheckEmailVerificationToken operation tests', () => {
  let dispatch;
  const { url, endpoint } = userCheckEmailVerificationTokenEndpoint;

  const params = {
    email_token: 'example-token',
  };

  const action = {
    token: 'example-token',
  };

  const beforeFunction = (httpClient) => () => {
    jest.clearAllMocks();
    dispatch = jest.fn();
    userCheckEmailVerificationToken.process(
      {
        action,
        httpClient,
      },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(userCheckEmailVerificationToken).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get' });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2, dataApiSuccess({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        showMessage({
          messageSubTitle: {
            id: 'shared.emailVerified',
          },
        }),
      );
      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        userSetEmailVerification(true),
      );
    });
  });

  describe('failure', () => {
    describe('when status === 404', () => {
      const error = { response: { status: 404 } };

      const httpClient = mockHttpClient({
        method: 'get',
        response: error,
        reject: true,
      });

      beforeEach(beforeFunction(httpClient));

      it('dispatches actions', () => {
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
        expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
      });
    });

    describe('when status === 422', () => {
      const error = { response: { status: 422 } };

      const httpClient = mockHttpClient({
        method: 'get',
        response: error,
        reject: true,
      });

      beforeEach(beforeFunction(httpClient));

      it('dispatches actions', () => {
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

      it('doesnt show error', () => {
        expect(showErrorNotifications).not.toHaveBeenCalled();
      });

      it('should redirect', () => {
        expect(redirect).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
      });
    });
  });
});
