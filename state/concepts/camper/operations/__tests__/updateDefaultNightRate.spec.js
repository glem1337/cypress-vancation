import normalize from 'json-api-normalizer';

import { CAMPER_INCLUSION } from 'constants/camper';
import { updateDefaultNightRateEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import showErrorNotifications from 'utils/showErrorNotifications';
import response from 'state/concepts/camper/__mocks__/updateDefaultNightRateResponse';
import { showMessage } from 'state/flash-messages/actions';
import { setCustomNightRatesIds } from 'state/concepts/calendar/actions';

import updateDefaultNightRate from '../updateDefaultNightRate';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('updateDefaultNightRate', () => {
  let dispatch;

  const action = {
    values: {
      costPerNight: 12,
      isCustomCost: true,
      weeklyPrice: {},
    },
    camperId: '9dc6fc17-a6f8-483a-b2f9-b268bbc60d92',
    form: {
      setSubmitting: jest.fn(),
      resetForm: jest.fn(),
    },
  };

  const body = {
    costomiziale_night_cost: action.values.isCustomCost,
    camper_id: action.camperId,
    cost_per_night: action.values.isCustomCost ? null : action.values.costPerNight,
    week_night_price: action.values.isCustomCost ? action.values.weeklyPrice : null,
  };

  const { endpoint, url } = updateDefaultNightRateEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    updateDefaultNightRate.process(
      { httpClient, action, getState: jest.fn() },
      dispatch,
      jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(updateDefaultNightRate).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'patch', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      const inclusions = [
        CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
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
      expect(dispatch).toHaveBeenCalledTimes(4);

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

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setCustomNightRatesIds([]),
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
