import normalize from 'json-api-normalizer';

import { updateInsuranceInfoEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import redirect from 'utils/redirect';
import ROUTES from 'constants/routes';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import showErrorNotifications from 'utils/showErrorNotifications';

import mockedResponse from 'state/concepts/camper/__mocks__/updateCamperResponse';
import updateInsuranceInfo from '../updateInsuranceInfo';

jest.mock('utils/redirect', () => jest.fn());

jest.mock('utils/showErrorNotifications', () => jest.fn());

describe('updateInsuranceInfo', () => {
  let dispatch;

  const action = {
    camperId: 'camperId',
    values: {
      inclusions: 'inclusions',
      actualCashValue: 1,
      vinNumber: 1,
      stateRegistered: 'Alabama',
      licensePlate: 1,
    },
  };

  const body = {
    camper_id: action.camperId,
    include: action.values.inclusions,
    actual_cash_value: action.values.actualCashValue || undefined,
    insurance_info: {
      vin_number: action.values.vinNumber,
      state_registred: action.values.stateRegistered,
      licence_plate: action.values.licensePlate,
    },
  };

  const { endpoint, url } = updateInsuranceInfoEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    updateInsuranceInfo.process({ httpClient, action }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(updateInsuranceInfo).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({
      method: 'patch',
      response: mockedResponse,
    });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.patch).toHaveBeenCalledWith(url, body);
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
      method: 'patch',
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
        method: 'patch',
        response: mockedResponse,
      });

      await updateInsuranceInfo.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.TRIP_FEES.PATH,
          null,
          { camper: action.camperId },
        ),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({
        method: 'patch',
        response: mockedResponse,
      });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await updateInsuranceInfo.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
