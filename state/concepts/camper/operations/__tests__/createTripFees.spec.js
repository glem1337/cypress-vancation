import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';
import { createTripFeesEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import response from '../../__mocks__/createTripFeesResponse';
import createTripFees from '../createTripFees';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('utils/redirect', () => jest.fn());

describe('createTripFees', () => {
  let dispatch;

  const action = {
    values: {
      cleaningAndPreparationFee: '1',
      mileage: {
        mode: 'limited',
        included: 150,
        overage: 0.5,
      },
      generator: {
        hasGenerator: true,
        mode: 'limited',
        included: 4,
        overage: 5,
      },
      customFees: {
        '7a363d88-6ba3-4022-a0af-7f634b290a55': {
          id: '7a363d88-6ba3-4022-a0af-7f634b290a55',
          name: '1',
          price: '1',
          period: '',
        },
      },
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
  };

  const body = {
    camper_id: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
    cleaning: 1,
    trip_fee_mileage: {
      limit: true,
      available: 150,
      overage: 0.5,
    },
    trip_fee_generator: {
      in_stock: true,
      limit: true,
      available: 4,
      overage: 5,
    },
    custom_fees: [
      {
        name: '1',
        price: 1,
        frequency: 'per_hour',
      },
    ],
  };

  const { endpoint, url } = createTripFeesEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    createTripFees.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(createTripFees).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(
        url,
        body,
      );
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(
            response.data,
            { endpoint },
          ),
        }),
      );
    });

    it('redirects', () => {
      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.POLICIES.PATH, action.camperId),
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
      expect(showErrorNotifications).toHaveBeenCalledWith(error, dispatch);
    });
  });

  describe('redirects', () => {
    it('default', async () => {
      const httpClient = mockHttpClient({ method: 'post', response });

      await createTripFees.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.POLICIES.PATH, action.camperId),
      );
    });

    it('with specific route', async () => {
      const httpClient = mockHttpClient({ method: 'post', response });

      const newAction = {
        ...action,
        values: {
          ...action.values,
          redirectRoute: 'Test redirectRoute',
        },
      };

      await createTripFees.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
