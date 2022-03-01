import * as actions from 'state/concepts/mapbox/actions';
import { mockedGeocoderList } from 'state/concepts/mapbox/__mocks__/mockFetchGeocoder';

describe('Mapbox actions', () => {
  it('fetchGeocoder()', () => {
    const expectedAction = { type: 'mapbox/FETCH_GEOCODER' };

    expect(actions.fetchGeocoder()).toEqual(expectedAction);
  });

  it('setGeocoder()', () => {
    const expectedAction = { type: 'mapbox/SET_GEOCODER', items: mockedGeocoderList };

    expect(actions.setGeocoder(mockedGeocoderList)).toEqual(expectedAction);
  });

  it('clearGeocoder()', () => {
    const expectedAction = { type: 'mapbox/CLEAR_GEOCODER' };

    expect(actions.clearGeocoder()).toEqual(expectedAction);
  });
});
