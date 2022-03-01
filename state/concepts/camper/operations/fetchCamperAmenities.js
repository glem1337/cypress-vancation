import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_CAMPER_AMENITIES } from 'state/concepts/camper/types';
import { fetchCamperAmenitiesEndpoint } from 'state/concepts/camper/endpoints';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchCamperAmenities = createLogic({
  type: FETCH_CAMPER_AMENITIES,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperAmenitiesEndpoint;

    const params = {
      include: action.inclusions,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchCamperAmenities;
