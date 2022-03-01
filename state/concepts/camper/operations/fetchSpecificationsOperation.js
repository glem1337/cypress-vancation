import { createLogic } from 'redux-logic';
import normalize from 'json-api-normalizer';

import { CAMPER_INCLUSION } from 'constants/camper';
import { FETCH_SPECIFICATIONS } from 'state/concepts/camper/types';
import { fetchSpecificationsEndpoint } from 'state/concepts/camper/endpoints';
import { dataApiFailure, dataApiRequest, dataApiSuccess } from 'state/data/actions';
import showErrorNotifications from 'utils/showErrorNotifications';

const fetchSpecifications = createLogic({
  type: FETCH_SPECIFICATIONS,
  latest: true,

  async process({ httpClient }, dispatch, done) {
    const { url, endpoint } = fetchSpecificationsEndpoint;

    dispatch(dataApiRequest({ endpoint }));

    const params = {
      include: [
        CAMPER_INCLUSION.VEHICLE.MAKES,
        CAMPER_INCLUSION.VEHICLE.MODELS,
      ].join(','),
    };

    try {
      const { data } = await httpClient.get(url, { params });

      dispatch(dataApiSuccess({ response: normalize(data, { endpoint }), endpoint }));
    } catch (error) {
      dispatch(dataApiFailure({ endpoint }));
      showErrorNotifications(error, dispatch);
    }
    done();
  },
});

export default fetchSpecifications;
