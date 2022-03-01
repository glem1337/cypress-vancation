import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import * as R from 'ramda';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_STATE_LOCATION } from 'state/concepts/campervan-rental/types';
import { fetchStateLocationEndpoint } from 'state/concepts/campervan-rental/endpoints';
import showErrorNotifications from 'utils/showErrorNotifications';
import { mapLocationSlugToId } from 'state/concepts/campervan-rental/actions';
import { setSearchDestinationLocation, setSearchDestinationLocationIntent } from 'state/concepts/search-destinations/actions';

import { fetchCampers, resetCampersData } from '../actions';

const fetchStateLocationOperation = createLogic({
  type: FETCH_STATE_LOCATION,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchStateLocationEndpoint;

    const params = {
      slug: action.location,
      include: action.inclusions,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      const location = R.compose(
        (obj) => ({
          ...obj,
          stateLanding: R.omit(['topLocationLandings'], obj.stateLanding),
        }),
        R.defaultTo({}),
      )(build(response, 'locationLanding', data.data.id));
      dispatch(setSearchDestinationLocation(location));
      dispatch(setSearchDestinationLocationIntent({
        landingName: location?.locationName,
      }));

      dispatch(resetCampersData());

      dispatch(fetchCampers({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: location.searchRadius,
      }));

      dispatch(mapLocationSlugToId({
        id: data.data.id,
        slug: data.data.attributes.slug,
      }));
      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchStateLocationOperation;
