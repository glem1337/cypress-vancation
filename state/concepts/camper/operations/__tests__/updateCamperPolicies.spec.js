import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import redirect from 'utils/redirect';
import showErrorNotifications from 'utils/showErrorNotifications';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';
import { POLICIES_FORM_DEFAULT_VALUES } from 'constants/camper';

import { updateCamperPolicesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import mockedResponse from '../../__mocks__/createCamperPoliciesResponse';
import updateCamperPolicies from '../updateCamperPolicies';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('updateCamperPolicies', () => {
  let dispatch;

  const action = {
    values: {
      bookingApprovalPolicy:
        POLICIES_FORM_DEFAULT_VALUES.BOOKING_APPROVAL_POLICY,
      cancellationPolicy: POLICIES_FORM_DEFAULT_VALUES.CANCELLATION_POLICY,
      requestNotice: POLICIES_FORM_DEFAULT_VALUES.REQUEST_NOTICE,
      autoBlockedDays: POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
    },
    camperId: '0aebbaa8-5006-483b-962c-82fe01ed581f',
  };

  const body = {
    camper_id: action.camperId,
    booking_approval_policy: action.values.bookingApprovalPolicy,
    cancellation_policy: action.values.cancellationPolicy,
    request_notice: action.values.requestNotice,
    auto_blocked_days: action.values.autoBlockedDays,
  };

  const { endpoint, url } = updateCamperPolicesEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    updateCamperPolicies.process({ httpClient, action }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(updateCamperPolicies).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'put',
      response: mockedResponse,
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.put).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      const response = normalize(mockedResponse.data);
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response,
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({
      method: 'put',
      reject: true,
      response: error,
    });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiFailure({ endpoint, error }),
      );
    });

    it('shows error', () => {
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });

  describe('redirects', () => {
    it('default', async () => {
      const httpClient = mockHttpClient({
        method: 'put',
        response: mockedResponse,
      });

      await updateCamperPolicies.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDITIONAL_DOCUMENTS.PATH,
          null,
          { camper: action.camperId },
        ),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({
        method: 'put',
        response: mockedResponse,
      });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await updateCamperPolicies.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
