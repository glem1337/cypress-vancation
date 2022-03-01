import normalize from 'json-api-normalizer';

import ROUTES from 'constants/routes';
import { PRICE_UNIT_TYPES } from 'constants/dashboardAddons';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import { createCamperTravelAccessoriesEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from '../../__mocks__/createCamperTravelAccessoriesResponse';

import createCamperTravelAccessories from '../createCamperTravelAccessories';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('utils/redirect', () => jest.fn());

describe('createCamperTravelAccessories', () => {
  let dispatch;

  const action = {
    values: {
      addons: [
        {
          id: 'id',
          active: true,
          price: '1',
          priceUnit: PRICE_UNIT_TYPES.EACH,
          description: 'description',
          maxAmount: '2',
        },
      ],
      customAddons: [
        {
          id: 'id',
          name: 'name',
          active: false,
          price: '1',
          priceUnit: PRICE_UNIT_TYPES.EACH,
          description: 'description',
          maxAmount: '2',
        },
      ],
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
  };

  const body = {
    camper_id: action.camperId,
    camper_travel_accessories: action.values.addons
      .filter((item) => item.active)
      .map((item) => ({
        travel_accessory_id: item.id,
        active: item.active,
        price: item.price,
        price_unit: item.priceUnit,
        description: item.description,
        max_amount: item.maxAmount,
      })),
    custom_travel_accessories: action.values.customAddons.map((item) => ({
      custom_travel_accessory_id: item.id,
      active: item.active,
      name: item.name,
      price: item.price,
      price_unit: item.priceUnit,
      description: item.description,
      max_amount: item.maxAmount,
    })),
  };

  const { endpoint, url } = createCamperTravelAccessoriesEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperTravelAccessories.process(
      { httpClient, action },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(createCamperTravelAccessories).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'post', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.post).toHaveBeenCalledWith(url, body);
    });

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, dataApiRequest({ endpoint }));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
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
      const httpClient = mockHttpClient({ method: 'post', response });

      await createCamperTravelAccessories.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.INSURANCE.PATH,
          null,
          {
            camper: action.camperId,
          },
        ),
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

      await createCamperTravelAccessories.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
