import { HYDRATE } from 'next-redux-wrapper';

import reducer from 'state/concepts/mapbox/reducer';
import * as types from 'state/concepts/mapbox/types';
import { mockedGeocoderList } from 'state/concepts/mapbox/__mocks__/mockFetchGeocoder';

describe('Mapbox reducers', () => {
  const initState = {
    geocoder: null,
  };

  describe('geocoder reducer', () => {
    it('type SET_GEOCODER', () => {
      const action = {
        type: types.SET_GEOCODER,
        items: mockedGeocoderList,
      };

      expect(reducer(initState, action).geocoder).toEqual(mockedGeocoderList);
    });

    it('type CLEAR_GEOCODER', () => {
      const action = {
        type: types.CLEAR_GEOCODER,
      };

      const state = {
        geocoder: mockedGeocoderList,
      };

      expect(reducer(state, action).geocoder).toEqual(null);
    });

    it('HYDRATE', () => {
      const action = {
        type: HYDRATE,
      };

      const state = {
        geocoder: mockedGeocoderList,
      };

      expect(reducer(state, action).geocoder).toEqual(null);
    });
  });
});
