import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';
import build from 'redux-object';
import * as R from 'ramda';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_STATE } from 'state/concepts/campervan-rental/types';
import { fetchStateEndpoint } from 'state/concepts/campervan-rental/endpoints';
import { mapStateSlugToId } from 'state/concepts/campervan-rental/actions';
import showErrorNotifications from 'utils/showErrorNotifications';
import { setSearchDestinationLocation, setSearchDestinationLocationIntent } from 'state/concepts/search-destinations/actions';

import { fetchCampers, resetCampersData } from '../actions';

const fetchStateOperation = createLogic({
  type: FETCH_STATE,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchStateEndpoint;

    const params = {
      slug: action.state,
      include: action.inclusions,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      const state = R.compose(
        (obj) => ({
          ...obj,
          topLocationLandings: R.defaultTo([], obj.topLocationLandings).map(item => R.omit(['stateLanding', 'seoInfo', 'funFacts'], item)),
        }),
        R.defaultTo({}),
      )(build(response, 'stateLanding', data.data.id));
      dispatch(setSearchDestinationLocation(state));
      dispatch(setSearchDestinationLocationIntent({
        landingName: state?.state,
      }));

      dispatch(resetCampersData());

      dispatch(fetchCampers({
        latitude: state.latitude,
        longitude: state.longitude,
        radius: state.searchRadius,
      }));

      dispatch(mapStateSlugToId({
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

export default fetchStateOperation;
