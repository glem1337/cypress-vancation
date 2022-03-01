import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import { createCamperPolicesEndpoint } from 'state/concepts/camper/endpoints';
import { showModal } from 'state/modal/actions';

import mockedResponse from '../../__mocks__/createCamperPoliciesResponse';
import setCamperPolicies from '../createCamperPolicies';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('utils/redirect', () => jest.fn());

describe('createCamperPolicies', () => {
  let dispatch;
  let getState;

  const body = {
    booking_approval_policy: 'instant_book',
    cancellation_policy: 'easy_going',
    camper_id: 'f7445371-9f19-4c52-b0a4-711785cb55f1',
  };

  const action = {
    values: {
      ...body,
    },
    form: {
      setSubmitting: jest.fn(),
    },
  };

  const { endpoint, url } = createCamperPolicesEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    getState = jest.fn(() => ({
      data: {
        camper: { id: 1 },
      },
    }));
    setCamperPolicies.process(
      {
        httpClient,
        getState,
        action,
      },
      dispatch,
      jest.fn(),
    );
  };

  const expectSetSubmittingFalse = () => expect(action.form.setSubmitting)
    .toHaveBeenCalledWith(false);

  it('has valid attributes', () => {
    expect(setCamperPolicies).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'post',
      response: mockedResponse,
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      const response = normalize(mockedResponse.data, { endpoint });
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response,
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        showModal({
          modalType: 'ID_VERIFICATION_MODAL',
          modalProps: {
            isUserVerified: false,
          },
        }),
      );
    });

    it('sets submitting to false', expectSetSubmittingFalse);
  });

  describe('success with redirect route', () => {
    it('success', async () => {
      dispatch = jest.fn();

      const httpClient = mockHttpClient({
        method: 'post',
        response: mockedResponse,
      });

      const actionExt = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'test redirect route',
        },
      };

      await setCamperPolicies.process(
        {
          httpClient,
          getState: jest.fn(),
          action: actionExt,
        },
        dispatch,
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('test redirect route');
      expect(dispatch).not.toHaveBeenCalledWith(
        showModal({
          modalType: 'ID_VERIFICATION_MODAL',
          modalProps: {
            isUserVerified: false,
          },
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'post',
      reject: true,
      response: error,
    });

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
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });
});
