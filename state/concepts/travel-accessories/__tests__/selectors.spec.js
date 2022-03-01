import normalize from 'json-api-normalizer';
import build from 'redux-object';

import { PRICE_UNIT_TYPES } from 'constants/dashboardAddons';

import isPresent from 'utils/isPresent';

import fetchTravelAccessoriesConfigResponse from 'state/concepts/travel-accessories/__mocks__/fetchTravelAccessoriesConfigResponse';
import { travelAccessoriesSelector } from 'state/concepts/travel-accessories/selectors';

import fetchCamperTravelAccessoriesResponse from 'state/concepts/camper/__mocks__/fetchCamperTravelAccessoriesResponse';
import { camperTravelAccessoriesSelector } from 'state/concepts/camper/selectors';

jest.mock('state/concepts/camper/selectors', () => ({
  camperTravelAccessoriesSelector: jest.fn(() => ({})),
}));

describe('Travel Accessories selectors', () => {
  it('travelAccessoriesSelector()', () => {
    const state = {
      data: normalize(fetchTravelAccessoriesConfigResponse.data),
    };
    const config = build(state.data, 'travelAccessory');

    const camperId = fetchCamperTravelAccessoriesResponse.data.data.id;
    const stateCamper = {
      data: normalize(fetchCamperTravelAccessoriesResponse.data),
    };

    const selected = camperTravelAccessoriesSelector(stateCamper, camperId);

    camperTravelAccessoriesSelector.mockReturnValueOnce(selected);

    const expected = config.map((item) => {
      const selectedItem = selected[item.id];

      return {
        ...item,
        active: isPresent(selectedItem),
        price: selectedItem?.price || undefined,
        description: selectedItem?.description || '',
        maxAmount: selectedItem?.maxAmount || undefined,
        priceUnit: selectedItem?.priceUnit || PRICE_UNIT_TYPES.EACH,
      };
    });

    expect(travelAccessoriesSelector(state, camperId)).toEqual(expected);
  });
});
