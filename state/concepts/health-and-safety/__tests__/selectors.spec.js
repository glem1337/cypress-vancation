import normalize from 'json-api-normalizer';
import build from 'redux-object';

import fetchHealthAndSafetyConfigResponse from 'state/concepts/health-and-safety/__mocks__/fetchHealthAndSafetyConfigResponse';
import fetchCamperHealtSafetyItemsResponse from 'state/concepts/health-and-safety/__mocks__/fetchCamperHealtSafetyItemsResponse';
import {
  amenityHealthAndSafetyItemsSelector,
  healthAndSafetyConfigSelector,
  selectedHealthAndSafetyItemsSelector,
} from 'state/concepts/health-and-safety/selectors';

describe('Health and Safety selectors', () => {
  it('healthAndSafetyConfigSelector()', () => {
    const state = {
      data: normalize(fetchHealthAndSafetyConfigResponse.data),
    };

    expect(healthAndSafetyConfigSelector(state)).toEqual(
      build(state.data, 'healthSafety'),
    );
  });

  it('selectedHealthAndSafetyItemsSelector()', () => {
    const state = {
      data: normalize(fetchCamperHealtSafetyItemsResponse.data),
    };

    expect(selectedHealthAndSafetyItemsSelector(state)).toMatchSnapshot();
  });

  it('amenityHealthAndSafetyItemsSelector()', () => {
    fetchCamperHealtSafetyItemsResponse.data.included = [
      ...fetchCamperHealtSafetyItemsResponse.data.included,
      ...fetchHealthAndSafetyConfigResponse.data.data,
    ];

    const state = {
      data: normalize(fetchCamperHealtSafetyItemsResponse.data),
    };

    expect(amenityHealthAndSafetyItemsSelector(state)).toMatchSnapshot();
  });
});
