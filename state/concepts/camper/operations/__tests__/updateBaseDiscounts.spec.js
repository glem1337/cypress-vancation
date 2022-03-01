import normalize from 'json-api-normalizer';

import { CAMPER_INCLUSION } from 'constants/camper';
import { updateBaseDiscountsEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import response from 'state/concepts/camper/__mocks__/updateBaseDiscountsResponse';
import { showMessage } from 'state/flash-messages/actions';

import updateBaseDiscounts from '../updateBaseDiscounts';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('updateBaseDiscounts', () => {
  let dispatch;

  const action = {
    values: {
      weeklyDiscount: true,
      monthlyDiscount: true,
      weeklyDiscountPercent: 3,
      monthlyDiscountPercent: 3,
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
    form: {
      setSubmitting: jest.fn(),
      resetForm: jest.fn(),
    },
  };

  const body = {
    weekly_discount: action.values.weeklyDiscount,
    monthly_discount: action.values.monthlyDiscount,
    camper_id: action.camperId,
    weekly_discount_percent: parseFloat(action.values.weeklyDiscountPercent),
    monthly_discount_percent: parseFloat(action.values.monthlyDiscountPercent),
  };

  const { endpoint, url } = updateBaseDiscountsEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    updateBaseDiscounts.process({ httpClient, action, getState: jest.fn() }, dispatch, jest.fn());
  };

  it('has valid attributes', () => {
    expect(updateBaseDiscounts).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'patch', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      const inclusions = [
        CAMPER_INCLUSION.PRICING_INFO.INDEX,
      ];

      expect(httpClient.patch).toHaveBeenCalledWith(
        url,
        body,
        {
          params: {
            include: inclusions.join(','),
          },
        },
      );
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        dataApiSuccess({
          endpoint,
          response: normalize(response.data),
        }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        showMessage({
          messageSubTitle: { id: 'calendar.settingsSuccessfullySaved' },
        }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'patch', reject: true, response: error });

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
