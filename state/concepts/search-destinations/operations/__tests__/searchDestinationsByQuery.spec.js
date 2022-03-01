import normalize from 'json-api-normalizer';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import { searchDestinationsByQueryEndpoint } from 'state/concepts/search-destinations/endpoints';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockHttpClient from 'utils/testHelpers/mockHttpClient';
import response from 'state/concepts/search-destinations/__mocks__/searchDestinationsByQueryResponse';
import mockedMapboxResponse from 'state/concepts/search-destinations/__mocks__/mapboxSearchResponse';
import { MAPBOX_FEATURE_TYPE, SEARCH_RESULTS_RADIUS, SEARCH_DESTINATIONS_BY_QUERY_MAPBOX_COUNT } from 'constants/searchDestinations';
import getStateShortCodeFromMapboxResult from 'utils/destinations/getStateShortCodeFromMapboxResult';

import { setDestinationsByQueryIds, setDestinationsMapBoxIds } from '../../actions';

import searchDestinationsByQuery from '../searchDestinationsByQuery';

jest.mock('axios', () => ({
  get: jest.fn(() => mockedMapboxResponse),
}));

describe('searchDestinationsByQuery', () => {
  let dispatch;
  let allow;
  let reject;

  const action = {
    query: 'test',
  };

  const params = {
    landing_name: action.query,
  };

  const { endpoint, url } = searchDestinationsByQueryEndpoint;

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn();
    allow = jest.fn();
    reject = jest.fn();

    searchDestinationsByQuery.validate({ action }, allow, reject);
    searchDestinationsByQuery.process(
      { httpClient, action, getState: jest.fn() }, dispatch, jest.fn(),
    );
  };

  it('has valid attributes', () => {
    expect(searchDestinationsByQuery).toMatchSnapshot();
  });

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response });

    beforeEach(beforeFunction(httpClient));

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url, { params });
    });

    it('success', () => {
      expect(dispatch).toHaveBeenCalledTimes(4);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      const mapBoxDestinations = R.compose(
        R.map(item => {
          const shortStateCode = getStateShortCodeFromMapboxResult(item);

          return {
              ...item,
              type: MAPBOX_FEATURE_TYPE,
              attributes: {
                id: uuid(),
                place_id: item.id,
                latitude: item.center[1],
                longitude: item.center[0],
                short_state_code: shortStateCode,
                place_name: item.place_name,
                place_short_name: item.text,
                type: MAPBOX_FEATURE_TYPE,
                searchRadius: SEARCH_RESULTS_RADIUS,
              },
          };
        }),
        R.take(SEARCH_DESTINATIONS_BY_QUERY_MAPBOX_COUNT),
        R.defaultTo([]),
        R.path(['data', 'features']),
      )(mockedMapboxResponse);

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        setDestinationsByQueryIds([response.data.data[0].id]),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setDestinationsMapBoxIds([mapBoxDestinations[0].id]),
      );

      // Prepare data
      const preparedResponse = {
        data: {
          data: [...response.data.data, ...mapBoxDestinations],
        },
      };

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        dataApiSuccess({
          endpoint,
          response: normalize(preparedResponse.data),
        }),
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
