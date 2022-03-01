import normalize from 'json-api-normalizer';
import { pluck } from 'ramda';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import { SEARCH_DESTINATIONS_BY_COORDINATES_COUNT, MAPBOX_FEATURE_TYPE, SEARCH_RESULTS_RADIUS } from 'constants/searchDestinations';
import { searchDestinationsByCoordinatesEndpoint } from 'state/concepts/search-destinations/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/search-destinations/__mocks__/searchDestinationsByCoordinatesResponse';
import { setCurrentCoordinates, setCurrentLocation } from 'state/app/actions';
import mockedMapboxResponse from 'state/concepts/search-destinations/__mocks__/mapboxSearchResponse';
import getStateShortCodeFromMapboxResult from 'utils/destinations/getStateShortCodeFromMapboxResult';

import { setDestinationsByCoordinatesIds } from '../../actions';

import searchDestinationsByCoordinates from '../searchDestinationsByCoordinates';

jest.mock('axios', () => ({
  get: jest.fn(() => mockedMapboxResponse),
}));

describe('searchDestinationsByCoordinates', () => {
  let dispatch;

  const action = {
    latitude: 'latitude',
    longitude: 'longitude',
  };

  const params = {
    latitude: action.latitude,
    longitude: action.longitude,
    records_amount: SEARCH_DESTINATIONS_BY_COORDINATES_COUNT,
  };

  const { endpoint, url } = searchDestinationsByCoordinatesEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    searchDestinationsByCoordinates.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(searchDestinationsByCoordinates).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(5);

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
        setCurrentCoordinates({
          latitude: parseFloat(response.data.meta.latitude),
          longitude: parseFloat(response.data.meta.longitude),
        }),
      );

      // Current user location
      const mapBoxDestination = R.compose(
        item => {
          const shortStateCode = getStateShortCodeFromMapboxResult(item);

          return {
              ...item,
              id: uuid(),
              placeId: item.id,
              latitude: item.center[1],
              longitude: item.center[0],
              shortStateCode,
              placeName: item.place_name,
              placeShortName: item.text,
              type: MAPBOX_FEATURE_TYPE,
              searchRadius: SEARCH_RESULTS_RADIUS,
          };
        },
        R.defaultTo({}),
        R.head,
        R.filter(item => R.test(/(place\.|region\.)/, item.id)),
        R.defaultTo([]),
        R.path(['data', 'features']),
      )(mockedMapboxResponse);

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setCurrentLocation(mapBoxDestination),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        setDestinationsByCoordinatesIds(pluck('id', response.data.data)),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    const httpClient = mockHttpClient({ method: 'get', reject: true, response: error });

    beforeEach(beforeFunction(httpClient));

    it('dispatches actions', () => {
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
  });
});
