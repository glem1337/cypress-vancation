import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { FETCH_VEHICLE_TYPES } from 'state/concepts/camper/types';
import { fetchVehicleTypesEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchVehicleTypesOperations = createLogic({
  type: FETCH_VEHICLE_TYPES,
  latest: true,

  async process({ httpClient }, dispatch, done) {
    const { url, endpoint } = fetchVehicleTypesEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    try {
      const { data } = await httpClient.get(url);

      dispatch(dataApiSuccess({ response: normalize(data), endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchVehicleTypesOperations;
