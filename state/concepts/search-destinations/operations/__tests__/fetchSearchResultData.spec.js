import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import mockedMapboxResponse from 'state/concepts/search-destinations/__mocks__/mapboxSearchResponse';
import { MAPBOX_FEATURE_TYPE, SEARCH_RESULTS_RADIUS } from 'constants/searchDestinations';
import getStateShortCodeFromMapboxResult from 'utils/destinations/getStateShortCodeFromMapboxResult';
import { resetCampersData, fetchCampers } from 'state/concepts/campervan-rental/actions';

import fetchSearchResultData from '../fetchSearchResultData';
import { fetchSearchResultDataOperationEndpoint } from '../../endpoints';
import { setSearchDestinationAllLocations } from '../../actions';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('axios', () => ({
  get: jest.fn(() => mockedMapboxResponse),
}));

describe('fetchSearchResultData', () => {
  const dispatch = jest.fn();

  const action = {
    placeId: 'region.23e932e3rnd',
  };

  const { endpoint } = fetchSearchResultDataOperationEndpoint(action.placeId);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('has valid attributes', () => {
    expect(fetchSearchResultData).toMatchSnapshot();
  });

  describe('success', () => {
    it('success', async () => {
      await fetchSearchResultData.process(
        { action }, dispatch, jest.fn(),
      );

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
        R.defaultTo([]),
        R.path(['data', 'features']),
      )(mockedMapboxResponse);

      expect(dispatch).toHaveBeenCalledTimes(5);

      expect(dispatch).toHaveBeenNthCalledWith(
        1,
        dataApiRequest({ endpoint }),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        resetCampersData(),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        setSearchDestinationAllLocations(mapBoxDestination),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        fetchCampers(),
      );

      expect(dispatch).toHaveBeenNthCalledWith(
        5,
        dataApiSuccess({ endpoint }),
      );
    });
  });

  describe('failure', () => {
    const error = new Error('test');

    it('dispatches actions', async () => {
      axios.get.mockReturnValueOnce(null);

      await fetchSearchResultData.process(
        { action }, dispatch, jest.fn(),
      );

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
