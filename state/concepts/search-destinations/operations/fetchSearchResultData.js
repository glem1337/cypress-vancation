import { createLogic } from 'redux-logic';
import axios from 'axios';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import { MAPBOX_FEATURE_TYPE, SEARCH_RESULTS_RADIUS } from 'constants/searchDestinations';
import { geocodingRoute } from 'lib/apiRoutes';
import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { ACCESS_TOKEN_MAPBOX, COUNTRY_DEFAULT_MAPBOX } from 'constants/mapbox';
import getStateShortCodeFromMapboxResult from 'utils/destinations/getStateShortCodeFromMapboxResult';
import { resetCampersData, fetchCampers } from 'state/concepts/campervan-rental/actions';

import { FETCH_SEARCH_RESULT_DATA } from '../types';
import { fetchSearchResultDataOperationEndpoint } from '../endpoints';
import { setSearchDestinationAllLocations } from '../actions';

const fetchSearchResultDataOperation = createLogic({
  type: FETCH_SEARCH_RESULT_DATA,
  latest: true,

  async process({ action }, dispatch, done) {
    const { endpoint } = fetchSearchResultDataOperationEndpoint(action.placeId);

    try {
      const mapboxUrl = geocodingRoute(action.placeId);

      dispatch(dataApiRequest({ endpoint }));

      // Data from MapBox
      const mapBoxResponse = await axios.get(mapboxUrl, {
        params: {
          access_token: ACCESS_TOKEN_MAPBOX,
          country: COUNTRY_DEFAULT_MAPBOX,
        },
      });

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
      )(mapBoxResponse);

      dispatch(resetCampersData());
      dispatch(setSearchDestinationAllLocations(mapBoxDestination));
      dispatch(fetchCampers());

      dispatch(dataApiSuccess({ endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
    }
    done();
  },
});

export default fetchSearchResultDataOperation;
