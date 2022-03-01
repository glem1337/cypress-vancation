import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { dataApiRequest, dataApiSuccess, dataApiFailure } from 'state/data/actions';
import { FETCH_CAMPER } from 'state/concepts/camper/types';
import { fetchCamperEndpoint } from 'state/concepts/camper/endpoints';
import { findExternalCalendarIds } from 'state/concepts/calendar/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchCamperOperation = createLogic({
  type: FETCH_CAMPER,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { endpoint, url } = fetchCamperEndpoint(action.id);

    const params = {
      include: action.inclusions,
    };

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url, { params });

      const response = normalize(data);

      dispatch(dataApiSuccess({ response, endpoint }));

      dispatch(findExternalCalendarIds(response));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint, error }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchCamperOperation;
