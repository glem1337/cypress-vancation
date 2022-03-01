import { mockedGeocoderList } from 'state/concepts/mapbox/__mocks__/mockFetchGeocoder';
import * as selectors from 'state/concepts/mapbox/selectors';

describe('Mapbox selectors', () => {
  describe('geocoderListSelector()', () => {
    const state = {
      mapbox: { geocoder: mockedGeocoderList },
    };

    it('returns geocoder list', () => {
      expect(selectors.geocoderListSelector(state)).toMatchSnapshot();
    });
  });
});
