import mockHttpClient from 'utils/testHelpers/mockHttpClient';

import { showModal } from 'state/modal/actions';
import {
  dataApiFailure,
  dataApiRequest,
  dataApiSuccess,
} from 'state/data/actions';
import { userCheckEmailTokenEndpoint } from 'state/concepts/session/endpoints';

import userCheckEmailTokenOperation from '../userCheckEmailToken';

describe('userCheckEmailToken operation tests', () => {
  let dispatch;
  const { url, endpoint } = userCheckEmailTokenEndpoint;

  const params = {
    email_token: 'example-token',
    password: null,
  };

  const modalType = 'EMAIL_TOKEN_EXPIRED_MODAL';

  const action = {
    token: 'example-token',
  };

  const beforeFunction = (httpClient) => () => {
    jest.clearAllMocks();
    dispatch = jest.fn();
    userCheckEmailTokenOperation.process(
      {
        action,
        httpClient,
      },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(userCheckEmailTokenOperation).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'patch' });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint with right params', () => {
      expect(httpClient.patch).toHaveBeenCalledWith(url, params);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));
      expect(dispatch).toHaveBeenNthCalledWith(2, dataApiSuccess({ endpoint }));
      expect(dispatch).not.toHaveBeenCalledWith(
        showModal({
          modalType,
        }),
      );
    });
  });

  describe('failure', () => {
    describe('when status === 404', () => {
      const httpClient = mockHttpClient({
        method: 'patch',
        response: { response: { status: 404 } },
        reject: true,
      });

      beforeEach(beforeFunction(httpClient));

      it('dispatches actions', () => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(
          1,
          dataApiRequest({ endpoint }),
        );
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          showModal({
            modalType,
          }),
        );
        expect(dispatch).toHaveBeenNthCalledWith(
          3,
          dataApiFailure({ endpoint }),
        );
      });
    });

    describe('when status === 422', () => {
      const httpClient = mockHttpClient({
        method: 'patch',
        response: { response: { status: 422 } },
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
          dataApiFailure({ endpoint }),
        );
        expect(dispatch).not.toHaveBeenCalledWith(
          showModal({
            modalType,
          }),
        );
      });
    });
  });
});
