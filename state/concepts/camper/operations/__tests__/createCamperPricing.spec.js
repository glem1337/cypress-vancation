import normalize from 'json-api-normalizer';

import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import redirect from 'utils/redirect';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import ROUTES from 'constants/routes';
import { createCamperPricingEndpoint } from 'state/concepts/camper/endpoints';
import {
  dataApiRequest,
  dataApiSuccess,
  dataApiFailure,
} from 'state/data/actions';

import response from '../../__mocks__/fetchCamperWithPricingInfoResponse';

import createCamperPricing from '../createCamperPricing';

jest.mock('utils/showErrorNotifications', () => jest.fn());
jest.mock('utils/redirect', () => jest.fn());

describe('createCamperPricing', () => {
  let dispatch;

  const action = {
    values: {
      costPerNight: 280,
      costomizialeNightCost: false,
      weekNightPrice: {
        monday_price: 250,
        tuesday_price: 250,
        wednesday_price: 250,
        thursday_price: 250,
        friday_price: 320,
        saturday_price: 320,
        sunday_price: 250,
      },
      weeklyDiscount: false,
      weeklyDiscountPercent: 15,
      monthlyDiscount: false,
      monthlyDiscountPercent: 33,
      minimalNightStay: 2,
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
  };

  const {
    costPerNight,
    costomizialeNightCost,
    weekNightPrice,
    weeklyDiscount,
    weeklyDiscountPercent,
    monthlyDiscount,
    monthlyDiscountPercent,
    minimalNightStay,
  } = action.values;

  const body = {
    camper_id: action.camperId,
    cost_per_night: costomizialeNightCost ? null : costPerNight,
    costomiziale_night_cost: costomizialeNightCost,
    week_night_price: costomizialeNightCost ? weekNightPrice : null,
    weekly_discount: weeklyDiscount,
    weekly_discount_percent: weeklyDiscount ? weeklyDiscountPercent : null,
    monthly_discount: monthlyDiscount,
    monthly_discount_percent: monthlyDiscount ? monthlyDiscountPercent : null,
    minimal_night_stay: minimalNightStay,
  };

  const { endpoint, url } = createCamperPricingEndpoint;

  const beforeFunction = (httpClient) => () => {
    dispatch = jest.fn();
    createCamperPricing.process({ httpClient, action }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(createCamperPricing).toMatchSnapshot();
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
          response: normalize(response.data, { endpoint }),
        }),
      );
    });

    it('redirects', () => {
      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(
          ROUTES.ADD_NEW_CAMPER.LISTING_FEES.PATH,
          action.camperId,
        ),
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

      await createCamperPricing.process(
        { httpClient, action, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith(
        createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_FEES.PATH, action.camperId),
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

      await createCamperPricing.process(
        { httpClient, action: newAction, getState: jest.fn() },
        jest.fn(),
        jest.fn(),
      );

      expect(redirect).toHaveBeenCalledWith('Test redirectRoute');
    });
  });
});
